interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<{ success: boolean; id?: string; mocked?: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Kehinde & Victor <celebrate@kehindeandvictor.com>";

  if (!apiKey) {
    console.log(`\n======================================================`);
    console.log(`[EMAIL DISPATCH - DEV SIMULATION]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`======================================================\n`);
    return { success: true, mocked: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend API error:", data);
      return { success: false };
    }
    return { success: true, id: data.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false };
  }
}

// Beautiful HTML Email Templates matching the wedding stationery
export function generateRSVPEmailHtml(guestName: string, status: string, guestCount: number, attendingEvents?: string): string {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #FAF4E6; border: 1.5px solid #AD802C; padding: 40px 30px; text-align: center; color: #2B2823;">
      <div style="border: 1px solid #D8B45D; padding: 30px 20px;">
        <p style="font-size: 13px; letter-spacing: 3px; color: #AD802C; text-transform: uppercase; margin: 0 0 10px;">Ayobamidele '26</p>
        <h1 style="font-size: 28px; color: #0F2116; margin: 0 0 15px; font-weight: normal;">Kehinde & Victor</h1>
        <p style="font-size: 14px; font-style: italic; color: #AD802C; margin-bottom: 25px;">Two Hearts. One Journey Forever.</p>
        
        <hr style="border: none; height: 1px; background-color: #AD802C; width: 60px; margin: 20px auto;" />

        <h2 style="font-size: 20px; color: #1E3B29; margin-bottom: 12px;">RSVP Confirmation: ${status}</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #2B2823;">
          Dear <strong>${guestName}</strong>,<br/>
          ${
            status === "Confirmed"
              ? `We have joyfully received your RSVP! We look forward to celebrating with you (${guestCount} attendee${guestCount > 1 ? "s" : ""}).`
              : "Thank you for letting us know. You will be dearly missed in our celebrations."
          }
        </p>

        ${
          attendingEvents
            ? `<div style="background-color: #F8F3E8; border: 1px solid #AD802C; border-radius: 6px; padding: 12px; margin: 18px 0; text-align: center; font-size: 14px; color: #1E3B29;">
                <strong>Selected Event:</strong> ${attendingEvents}
              </div>`
            : ""
        }

        <div style="background-color: #F1E6CC; border-radius: 6px; padding: 18px; margin: 25px 0; text-align: left; font-size: 14px; color: #0F2116;">
          <p style="margin: 0 0 8px;"><strong>Engagement:</strong> Wed, 18th Nov 2026 &middot; 4:00 PM Prompt (21 Olawale Badmus St, Turaya, Mowe)</p>
          <p style="margin: 0 0 8px;"><strong>White Wedding Ceremony:</strong> Thur, 19th Nov 2026 &middot; 10:00 AM Prompt (RCCG Redemption Parish, Turaya, Mowe)</p>
          <p style="margin: 0 0 8px;"><strong>Reception:</strong> 18/12 Castro Hall, 10 Ibukun Oluwa Street, Asolo Bus Stop, Mowe</p>
          <p style="margin: 0;"><strong>Color Code:</strong> Mustard Gold &amp; Forest Green</p>
        </div>

        <p style="font-size: 13px; color: #6E685E; margin-top: 30px;">
          For enquiries, contact: 0813 676 9807 or 0907 724 9194
        </p>
      </div>
    </div>
  `;
}

export function generateGiftReservationPendingEmailHtml(guestName: string, giftName: string): string {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #FAF4E6; border: 1.5px solid #AD802C; padding: 40px 30px; text-align: center; color: #2B2823;">
      <div style="border: 1px solid #D8B45D; padding: 30px 20px;">
        <p style="font-size: 13px; letter-spacing: 3px; color: #AD802C; text-transform: uppercase; margin: 0 0 10px;">Ayobamidele '26</p>
        <h1 style="font-size: 26px; color: #0F2116; margin: 0 0 10px;">Kehinde & Victor</h1>
        <p style="font-size: 14px; font-style: italic; color: #AD802C; margin-bottom: 25px;">Bless Our Beginning</p>
        
        <h2 style="font-size: 20px; color: #1E3B29;">Gift Reservation Request Received</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #2B2823;">
          Dear <strong>${guestName}</strong>,<br/>
          Thank you so much for your thoughtfulness! Your request to reserve the following gift item has been received:
        </p>
        <div style="background-color: #F1E6CC; padding: 15px; margin: 20px 0; font-size: 16px; font-weight: bold; color: #1E3B29; border-radius: 6px;">
          ${giftName}
        </div>
        <p style="font-size: 14px; line-height: 1.5; color: #4A453E; background-color: #F8F3E8; border: 1px solid #D8B45D; border-radius: 6px; padding: 12px; margin: 18px 0;">
          <strong>Status: Pending Administrative Confirmation</strong><br/>
          To ensure items are not double-booked, reservations are reviewed and confirmed by the couple. You will receive another notification once your reservation is confirmed.
        </p>
        <p style="font-size: 13px; color: #6E685E; margin-top: 25px;">
          For enquiries or adjustments, contact: 0813 676 9807 or 0907 724 9194
        </p>
      </div>
    </div>
  `;
}

export function generateGiftReservationConfirmedEmailHtml(guestName: string, giftName: string): string {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #FAF4E6; border: 1.5px solid #AD802C; padding: 40px 30px; text-align: center; color: #2B2823;">
      <div style="border: 1px solid #D8B45D; padding: 30px 20px;">
        <p style="font-size: 13px; letter-spacing: 3px; color: #AD802C; text-transform: uppercase; margin: 0 0 10px;">Ayobamidele '26</p>
        <h1 style="font-size: 26px; color: #0F2116; margin: 0 0 10px;">Kehinde & Victor</h1>
        <p style="font-size: 14px; font-style: italic; color: #AD802C; margin-bottom: 25px;">Bless Our Beginning</p>
        
        <h2 style="font-size: 20px; color: #1E3B29;">Gift Reservation Confirmed! &#10003;</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #2B2823;">
          Dear <strong>${guestName}</strong>,<br/>
          We have joyfully confirmed your reservation for:
        </p>
        <div style="background-color: #F1E6CC; padding: 15px; margin: 20px 0; font-size: 16px; font-weight: bold; color: #1E3B29; border-radius: 6px;">
          ${giftName}
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #2B2823;">
          This item is now officially reserved in your honour and marked off our public registry. We are deeply grateful for your generous love and support as we begin our holy union!
        </p>
        <p style="font-size: 13px; color: #6E685E; margin-top: 25px;">
          For delivery coordination, contact: 0813 676 9807 or 0907 724 9194
        </p>
      </div>
    </div>
  `;
}

// Backward-compatible alias
export const generateGiftReservationEmailHtml = generateGiftReservationPendingEmailHtml;

export function generateMonetaryGiftVerifiedEmailHtml(
  senderName: string,
  amount: number,
  bankUsed?: string,
  reference?: string
): string {
  const formattedAmount = `₦${Number(amount || 0).toLocaleString()}`;
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #FAF4E6; border: 1.5px solid #AD802C; padding: 40px 30px; text-align: center; color: #2B2823;">
      <div style="border: 1px solid #D8B45D; padding: 30px 20px;">
        <p style="font-size: 13px; letter-spacing: 3px; color: #AD802C; text-transform: uppercase; margin: 0 0 10px;">Ayobamidele '26</p>
        <h1 style="font-size: 26px; color: #0F2116; margin: 0 0 10px;">Kehinde & Victor</h1>
        <p style="font-size: 14px; font-style: italic; color: #AD802C; margin-bottom: 25px;">Two Hearts. One Journey Forever.</p>
        
        <h2 style="font-size: 20px; color: #1E3B29;">Bank Transfer Received & Acknowledged! &#10003;</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #2B2823;">
          Dear <strong>${senderName}</strong>,<br/>
          We are writing with full and joyful hearts to confirm that your monetary gift has been received and verified by us:
        </p>
        <div style="background-color: #F1E6CC; padding: 18px; margin: 20px 0; border-radius: 8px; border: 1px solid #D8B45D;">
          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #AD802C; font-weight: bold;">Verified Amount</p>
          <p style="margin: 5px 0 0; font-size: 26px; font-weight: bold; color: #1E3B29; font-family: monospace;">${formattedAmount}</p>
          ${bankUsed || reference ? `
            <p style="margin: 8px 0 0; font-size: 12px; color: #6E685E;">
              ${[bankUsed ? `Bank: ${bankUsed}` : "", reference ? `Ref: ${reference}` : ""].filter(Boolean).join(" &middot; ")}
            </p>
          ` : ""}
        </div>
        <p style="font-size: 15px; line-height: 1.6; color: #2B2823; margin: 20px 0;">
          Thank you so deeply for honouring us and sowing into our new beginning. May God Almighty pour back into your life, bless the work of your hands, and enrich you abundantly in Jesus&rsquo; name!
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #D8B45D/40;">
          <p style="font-size: 14px; color: #1E3B29; font-weight: bold; margin: 0 0 4px;">With All Our Love & Gratitude,</p>
          <p style="font-size: 16px; color: #0F2116; font-style: italic; margin: 0;">Kehinde & Victor (Ayobamidele '26)</p>
          <p style="font-size: 12px; color: #6E685E; margin-top: 15px;">
            Enquiries: 0813 676 9807 &middot; 0907 724 9194
          </p>
        </div>
      </div>
    </div>
  `;
}

