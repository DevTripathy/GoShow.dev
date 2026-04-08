export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #F84565;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use below OTP to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 10 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #F84565;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 10 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

export const WELCOME_TEMPLATE = `<!--
* This email was built using Tabular.
* For more information, visit https://tabular.email
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]>-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body {
min-width: 100%;
Margin: 0px;
padding: 0px;
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t26,.t31{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t27{padding-top:43px!important;border:0!important;border-radius:0!important}.t10,.t8{max-width:320px!important}.t6{line-height:28px!important;mso-text-raise:1px!important}
}
</style>
<!--[if !mso]>-->
<style type="text/css">@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&amp;display=swap');</style>
<!--<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id="body" class="t34" style="min-width:100%;Margin:0px;padding:0px;background-color:#ffffff;"><div class="t33" style="background-color:#ffffff;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t32" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#ffffff;background-image:url(https://wallpapers.com/images/hd/black-and-pink-color-gradient-wulps13llkt7c08v.jpg);background-repeat:no-repeat;background-size:cover;background-position:right bottom;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#ffffff"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t26" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t30" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="400" class="t29" style="width:400px;">
<table class="t28" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t27" style="border:3px solid #F3F3F3;overflow:hidden;background-color:#0D0C0C;padding:50px 40px 40px 40px;border-radius:20px 20px 20px 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
<table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="170" class="t3" style="width:170px;">
<table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t1"><a href="#" style="font-size:0px;" target="_blank"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="170" height="45.90289608177172" alt="" src="https://ad5a3560-ffa9-4b52-a8e1-4e839196f2fa.b-cdn.net/e/3d660bbf-af5d-4a51-8960-91ef8900c9aa/b30beefb-0744-40c8-99e9-cd3baf226db5.png"/></a></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;max-width:314px;"><tr><td class="t9" style="width:auto;">
<table class="t8" role="presentation" cellpadding="0" cellspacing="0" style="width:auto;max-width:314px;"><tr><td class="t7"><h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:20px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0.7999999999999998px;direction:ltr;color:#FFFFFF;text-align:left;mso-line-height-rule:exactly;mso-text-raise:-1px;">Hello, {{fullname}}</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t12" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="308" class="t15" style="width:308px;">
<table class="t14" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t13"><p class="t11" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#FFFFFF;text-align:justify;mso-line-height-rule:exactly;mso-text-raise:2px;">Thank you for signing up on GoShow! We&#39;re excited to have you with us. Book your movie tickets with ease.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t21" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t25" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="314" class="t24" style="width:318px;">
<table class="t23" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t22"><p class="t20" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#FFFFFF;text-align:justify;mso-line-height-rule:exactly;mso-text-raise:2px;">Best Regards,<br/><span class="t18" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t17" style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;"></span></span><span class="t19" style="margin:0;Margin:0;line-height:24px;font-weight:700;mso-line-height-rule:exactly;mso-text-raise:NaNpx;">GoShow Team</span></p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t31" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>`

export const TICKET_BOOKING_TEMPLATE = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>GoShow Movie Ticket Booking Confirmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img{ -ms-interpolation-mode:bicubic; }
    img{ border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
    table{ border-collapse:collapse !important; }
    body{ margin:0 !important; padding:0 !important; width:100% !important; font-family:'Outfit', Arial, sans-serif; background-color:#0b0c10; color:#ffffff; }

    .email-wrapper{ width:100%; background:#0b0c10; padding:40px 0; }
    .email-content{ max-width:720px; margin:0 auto; background:#1a1d29; border-radius:10px; overflow:hidden; }

    .header{ padding:24px; text-align:left; background:linear-gradient(135deg,#F84565,#c72b48); color:#ffffff; }
    .brand{ font-size:24px; font-weight:700; letter-spacing:0.3px; font-family:'Outfit', Arial, sans-serif; }
    .preheader{ font-size:14px; color:#ffe6ea; margin-top:6px; font-family:'Outfit', Arial, sans-serif; }

    .body{ padding:32px; color:#ffffff; font-family:'Outfit', Arial, sans-serif; }
    h1{ font-size:24px; margin:0 0 10px 0; font-family:'Outfit', Arial, sans-serif; color:#ffffff; }
    p{ font-size:16px; margin:10px 0 18px 0; line-height:1.5; font-family:'Outfit', Arial, sans-serif; color:#d1d5db; }

    .ticket{ border:1px dashed #F84565; padding:16px; border-radius:8px; background:#12141c; }
    .ticket-row{ display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
    .ticket-left{ font-size:16px; font-family:'Outfit', Arial, sans-serif; color:#ffffff; }
    .ticket-right{ font-size:16px; text-align:right; font-family:'Outfit', Arial, sans-serif; color:#d1d5db; }

    .price-table{ width:100%; margin-top:16px; border-top:1px solid #2b2f3a; }
    .price-table td{ padding:10px 0; font-size:15px; font-family:'Outfit', Arial, sans-serif; color:#d1d5db; }
    .price-label{ color:#9ca3af; }
    .price-value{ text-align:right; font-weight:600; color:#ffffff; }

    .cta{ display:block; text-align:center; margin:24px 0 10px 0; }
    .btn{ background:#F84565; color:#ffffff; text-decoration:none; padding:14px 22px; border-radius:8px; font-weight:600; display:inline-block; font-family:'Outfit', Arial, sans-serif; font-size:16px; }

    .footer{ font-size:13px; color:#9ca3af; padding:20px; text-align:center; font-family:'Outfit', Arial, sans-serif; background:#1a1d29; }

    @media screen and (max-width:480px){
      .ticket-row{ display:block; text-align:left; }
      .ticket-right{ margin-top:8px; text-align:left; }
      .header{ text-align:center; }
      .body{ padding:20px; }
    }
  </style>
</head>
<body>
  <center class="email-wrapper">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" class="email-content" width="100%">
            <tr>
              <td class="header">
                <div class="brand">GoShow</div>
                <div class="preheader">Your booking is confirmed — enjoy the show!</div>
              </td>
            </tr>
            <tr>
              <td class="body">
                <h1>Booking Confirmed — {{movie_title}}</h1>
                <p>Hi <strong>{{customer_name}}</strong>,</p>
                <p>Your movie tickets have been successfully booked. Below are your booking details — bring this email to the theatre or show the e-ticket at the entrance.</p>

                <div class="ticket" role="article" aria-label="Ticket details">
                  <div class="ticket-row">
                    <div class="ticket-left">
                      <div style="font-size:18px;font-weight:700;">{{movie_title}}</div>
                      <div style="font-size:14px;color:#9ca3af;margin-top:4px;">{{language}} • {{duration}} • {{genre}}</div>
                    </div>
                    <div class="ticket-right">
                      <div style="font-size:16px;">{{date}} at {{time}}</div>
                    </div>
                  </div>

                  <div style="border-top:1px solid #2b2f3a;margin-top:12px;padding-top:12px;">
                    <table role="presentation" width="100%">
                      <tr>
                        <td style="font-size:15px;">Seats</td>
                        <td style="text-align:right;font-weight:600;">{{seat_numbers}}</td>
                      </tr>
                      <tr>
                        <td style="font-size:15px;">Booking ID</td>
                        <td style="text-align:right;">{{booking_id}}</td>
                      </tr>
                    </table>

                    <table role="presentation" class="price-table" width="100%">
                      <tr>
                        <td class="price-label">Ticket Price ({{quantity}} x {{price_per_ticket}})</td>
                        <td class="price-value">{{currency}} {{subtotal}}</td>
                      </tr>
                      <tr>
                        <td class="price-label">Convenience Fee</td>
                        <td class="price-value">{{currency}} {{convenience_fee}}</td>
                      </tr>
                      <tr>
                        <td class="price-label">Taxes</td>
                        <td class="price-value">{{currency}} {{taxes}}</td>
                      </tr>
                      <tr style="border-top:1px solid #2b2f3a;">
                        <td style="padding-top:12px;font-size:18px;font-weight:700;">Total</td>
                        <td style="padding-top:12px;text-align:right;font-size:18px;font-weight:700;color:#F84565;">{{currency}} {{total_price}}</td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div class="cta">
                  <a href="{{view_ticket_url}}" class="btn" target="_blank" rel="noopener">View / Download E-Ticket</a>
                </div>

                <p style="margin-top:8px;color:#9ca3af;font-size:14px;">Show up at least 20 minutes before the showtime. Seats are reserved and non-transferable. For refunds or changes, visit our <a href="{{support_url}}" style="color:#F84565;text-decoration:none;">support page</a>.</p>

                <hr style="border:none;border-top:1px solid #2b2f3a;margin:24px 0;">

                <p style="font-size:14px;color:#9ca3af;margin:0;">Need to change or cancel? Use your Booking ID above when contacting support.</p>

              </td>
            </tr>
            <tr>
              <td class="footer">
                <div>GoShow</div>
                <div style="margin-top:6px;">© <span id="year">2025</span> GoShow. All rights reserved.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`