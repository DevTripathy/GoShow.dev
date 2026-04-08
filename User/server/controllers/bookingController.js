import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import userModel from '../models/userModel.js';
import Movie from '../models/Movie.js';
import transporter from '../configs/nodemailer.js';
import { TICKET_BOOKING_TEMPLATE } from '../configs/emailTemplates.js';

//Function to check availability of booking slots
const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);
        if (!showData) {
            return false;
        }
        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;
    }
    catch (error) {
        console.error('Error checking seat availability:', error);
        return false;
    }
}

//Hold Seats
export const holdSeats = async (req, res) => {
    try {
        const { showId, selectedSeats } = req.body;
        const userId = req.userId;

        const show = await Show.findById(showId);
        const now = new Date();

        // remove expired holds
        Object.keys(show.heldSeats).forEach(seat => {
            if (show.heldSeats[seat].expiresAt < now) {
                delete show.heldSeats[seat];
            }
        });

        // check availability
        for (let seat of selectedSeats) {
            if (show.occupiedSeats[seat]) {
                return res.json({ success: false, message: `${seat} already booked` });
            }

            if (show.heldSeats[seat] && show.heldSeats[seat].expiresAt > now) {
                return res.json({ success: false, message: `${seat} is being held` });
            }
        }

        // hold seats for 1 minute
        const expiry = new Date(Date.now() + 60 * 1000);

        selectedSeats.forEach(seat => {
            show.heldSeats[seat] = {
                userId,
                expiresAt: expiry
            };
        });

        show.markModified("heldSeats");
        await show.save();

        res.json({ success: true, expiry });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const createBooking = async (req, res) => {
    try {
        const userId = req.userId;
        const { showId, selectedSeats, amount } = req.body;
        const { origin } = req.headers;

        // Check if the selected seats are available
        const showData = await Show.findById(showId);

        const areSeatsAvailable = await checkSeatsAvailability(showId, selectedSeats);

        if (!areSeatsAvailable) {
            return res.json({ success: false, message: 'Selected seats are already booked. Please choose different seats.' });
        }

        const now = new Date();

        for (let seat of selectedSeats) {
            const hold = showData.heldSeats?.[seat];

            if (!hold || hold.userId !== userId || hold.expiresAt < now) {
                return res.json({
                    success: false,
                    message: "Seat hold expired or not reserved by you"
                });
            }
        }

        // Get show details

        if (!showData) {
            return res.json({ success: false, message: 'Show not found.' });
        }

        // Proceed with booking creation logic here
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        })

        // If payment details are provided, mark as paid
        if (req.body.razorpay_payment_id) {
            booking.isPaid = true;
            booking.paymentLink = req.body.razorpay_payment_id;
            await booking.save();
        }

        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId;
        });

        // remove held seats after booking
        selectedSeats.forEach(seat => {
            delete showData.heldSeats[seat];
        });

        showData.markModified('occupiedSeats');
        await showData.save();

        // Send ticket booking email
        const user = await userModel.findById(userId);
        const movie = await Movie.findById(showData.movie);

        if (user && movie) {
            const emailHtml = TICKET_BOOKING_TEMPLATE
                .replace(/{{movie_title}}/g, movie.title)
                .replace(/{{customer_name}}/g, user.fullname)
                .replace(/{{language}}/g, movie.original_language || 'English')
                .replace(/{{duration}}/g, `${movie.runtime} min`)
                .replace(/{{genre}}/g, movie.genres.join(', '))
                .replace(/{{date}}/g, new Date(showData.showDateTime).toLocaleDateString())
                .replace(/{{time}}/g, new Date(showData.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                .replace(/{{seat_numbers}}/g, selectedSeats.join(', '))
                .replace(/{{booking_id}}/g, booking._id.toString())
                .replace(/{{quantity}}/g, selectedSeats.length.toString())
                .replace(/{{price_per_ticket}}/g, showData.showPrice.toString())
                .replace(/{{currency}}/g, '₹')
                .replace(/{{subtotal}}/g, (showData.showPrice * selectedSeats.length).toString())
                .replace(/{{convenience_fee}}/g, '0')
                .replace(/{{taxes}}/g, '0')
                .replace(/{{total_price}}/g, (showData.showPrice * selectedSeats.length).toString())
                .replace(/{{view_ticket_url}}/g, `${origin}/my-bookings`)
                .replace(/{{support_url}}/g, `${origin}/support`);

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Your GoShow Movie Ticket Booking Confirmation',
                html: emailHtml
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Ticket booking email sent successfully');
            } catch (emailError) {
                console.error('Error sending ticket booking email:', emailError);
            }
        }

        res.json({ success: true, message: 'Booking created successfully', bookingId: booking._id });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const showData = await Show.findById(showId);
        // if (!showData) {
        //     return res.json({ success: false, message: 'Show not found.' });
        // }

        const occupiedSeats = Object.keys(showData.occupiedSeats);
        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

