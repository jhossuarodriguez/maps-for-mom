import { ActionError, defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    send: defineAction({
        accept: 'form',
        input: z.object({
            image: z.instanceof(File).optional(),
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email address"),
            phone: z.string().min(1, "Phone number is required"),
            travelers: z.string().min(1, "Travelers information is required"),
            travelDates: z.string().min(1, "Travel dates are required"),
            destination: z.string().min(1, "Destination is required"),
            budget: z.string().min(1, "Budget is required"),
            accommodation: z.string().min(1, "Accommodation preference is required"),
            transportation: z.string().min(1, "Transportation preference is required"),
            reason: z.string().min(1, "Reason for trip is required"),
            excitedActivities: z.string().min(1, "Excited activities are required"),
            avoidActivities: z.string().optional(),
            suggestions: z.string().min(1, "Suggestion preference is required"),
            idealGetaway: z.string().min(1, "Ideal getaway description is required"),
            wellnessExperiences: z.string().optional(),
            allergies: z.string().optional(),
            healthConsiderations: z.string().optional(),
        }),
        handler: async (input) => {
            const {
                name,
                email,
                phone,
                travelers,
                travelDates,
                destination,
                budget,
                accommodation,
                transportation,
                reason,
                excitedActivities,
                avoidActivities,
                idealGetaway,
                wellnessExperiences,
                suggestions,
                allergies,
                healthConsiderations
            } = input;

            // Validate RESEND_API_KEY
            if (!import.meta.env.RESEND_API_KEY) {
                throw new ActionError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: "Email service configuration is missing",
                });
            }

            // Escape HTML to prevent XSS in email templates
            const escapeHtml = (text: string | undefined): string => {
                if (!text) return '';
                return text
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            };

            const safeName = escapeHtml(name);
            const safeEmail = escapeHtml(email);
            const safePhone = escapeHtml(phone);
            const safeTravelers = escapeHtml(travelers);
            const safeTravelDates = escapeHtml(travelDates);
            const safeDestination = escapeHtml(destination);
            const safeBudget = escapeHtml(budget);
            const safeAccommodation = escapeHtml(accommodation);
            const safeTransportation = escapeHtml(transportation);
            const safeReason = escapeHtml(reason);
            const safeExcitedActivities = escapeHtml(excitedActivities);
            const safeAvoidActivities = escapeHtml(avoidActivities);
            const safeIdealGetaway = escapeHtml(idealGetaway);
            const safeWellnessExperiences = escapeHtml(wellnessExperiences);
            const safeSuggestions = escapeHtml(suggestions);
            const safeAllergies = escapeHtml(allergies);
            const safeHealthConsiderations = escapeHtml(healthConsiderations);

            const MESSAGE_CONFIRMATION = `
                <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #eee7df; padding: 48px 20px; color: #2a2a2a;">
                    <div style="max-width: 720px; margin: 0 auto;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img 
                                src="https://maps-for-mom.vercel.app/logo-email.png" 
                                alt="Logo Maps for Mom" 
                                style="height: 44px; width: auto; border: 0;"
                            />
                        </div>

                        <div style="background-color: #ffffff; border: 1px solid #ece3db; border-radius: 16px; box-shadow: 0 18px 40px rgba(0,0,0,0.06); overflow: hidden;">
                            <div style="height: 8px; background: linear-gradient(90deg, #D19789, #95a799);"></div>
                            <div style="padding: 32px;">
                                <h2 style="color: #D19789; margin: 0 0 16px; font-size: 24px; letter-spacing: 0.4px; font-weight: 800;">Your Journey Starts Here! ✨</h2>
                                <p style="color: #4a4a4a; font-size: 15px; line-height: 1.7; margin: 0;">
                                    We've received your questionnaire ✨<br />
                                    <br />
                                    Our team will review your details and reach out within 24 hours to begin curating your personalized travel experience.<br />
                                    <br />
                                    <span style="color: #2a2a2a; font-weight: 600;">Sit back, relax… we've got the planning covered.</span>
                                </p>
                            </div>
                        </div>
                        
                        <p style="text-align: center; color: #7a7a7a; font-size: 12px; margin-top: 18px;">
                            © 2025 Maps for Mom. All rights reserved
                        </p>
                    </div>
                </div>
            `;

            const MESSAGE_RECEIVED = `
                <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #eee7df; padding: 48px 20px; color: #2a2a2a;">
                    <div style="max-width: 720px; margin: 0 auto;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img 
                                src="https://maps-for-mom.vercel.app/logo-email.png" 
                                alt="Logo Maps for Mom" 
                                style="height: 44px; width: auto; border: 0;"
                            />
                        </div>

                        <div style="background-color: #ffffff; border: 1px solid #ece3db; border-radius: 16px; box-shadow: 0 18px 40px rgba(0,0,0,0.06); overflow: hidden;">
                            <div style="height: 8px; background: linear-gradient(90deg, #D19789, #95a799);"></div>
                            <div style="padding: 32px;">
                                <h2 style="color: #D19789; margin: 0 0 12px; font-size: 22px; letter-spacing: 0.4px; text-align: left;">New Trip Questionnaire ✨</h2>
                                
                                <p style="color: #4a4a4a; font-size: 14px; margin: 0 0 16px; line-height: 1.6;">
                                    <span style="display: inline-block; padding: 10px 14px; background: #f7f2ed; border: 1px solid #ece3db; border-radius: 999px; color: #2a2a2a; font-weight: 600;">
                                        From: ${safeName} • <a href="mailto:${email}" style="color: #D19789; text-decoration: none;">${safeEmail}</a>
                                    </span>
                                </p>

                                <div style="margin-bottom: 22px;">
                                    <h3 style="color: #95a799; font-size: 15px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.6px;">Traveler Information</h3>
                                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a; width: 40%;">Phone:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a; font-weight: 600;">${safePhone}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a;">Travelers:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a; font-weight: 600;">${safeTravelers}</td>
                                        </tr>
                                    </table>
                                </div>

                                <div style="margin-bottom: 22px;">
                                    <h3 style="color: #95a799; font-size: 15px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.6px;">Trip Basics</h3>
                                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a; width: 40%;">Dates:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a; font-weight: 600;">${safeTravelDates}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a;">Destination:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a; font-weight: 600;">${safeDestination}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a;">Budget:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a; font-weight: 600;">${safeBudget}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a;">Accommodation:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a; font-weight: 600;">${safeAccommodation}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a;">Transport:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a; font-weight: 600;">${safeTransportation}</td>
                                        </tr>
                                    </table>
                                </div>

                                <div style="margin-bottom: 22px;">
                                    <h3 style="color: #95a799; font-size: 15px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.6px;">Vision & Interests</h3>
                                    
                                    <div style="margin-bottom: 14px;">
                                        <span style="display: block; color: #7a7a7a; font-size: 12px; margin-bottom: 4px;">Reason for trip:</span>
                                        <div style="color: #2a2a2a; background: #fdfaf8; padding: 12px; border-radius: 10px; border: 1px solid #ece3db;">${safeReason}</div>
                                    </div>

                                    <div style="margin-bottom: 14px;">
                                        <span style="display: block; color: #7a7a7a; font-size: 12px; margin-bottom: 4px;">Excited about:</span>
                                        <div style="color: #2a2a2a; background: #fdfaf8; padding: 12px; border-radius: 10px; border: 1px solid #ece3db;">${safeExcitedActivities}</div>
                                    </div>

                                    <div style="margin-bottom: 14px;">
                                        <span style="display: block; color: #7a7a7a; font-size: 12px; margin-bottom: 4px;">Activities to avoid:</span>
                                        <div style="color: #2a2a2a; background: #fdfaf8; padding: 12px; border-radius: 10px; border: 1px solid #ece3db;">${safeAvoidActivities || "None provided"}</div>
                                    </div>

                                    <div style="margin-bottom: 14px;">
                                        <span style="display: block; color: #7a7a7a; font-size: 12px; margin-bottom: 4px;">Ideal Getaway Description:</span>
                                        <div style="color: #2a2a2a; background: #fdfaf8; padding: 12px; border-radius: 10px; border: 1px solid #ece3db; font-style: italic;">"${safeIdealGetaway}"</div>
                                    </div>
                                    
                                    <div style="margin-bottom: 14px;">
                                        <span style="display: block; color: #7a7a7a; font-size: 12px; margin-bottom: 4px;">Wellness Requests:</span>
                                        <div style="color: #2a2a2a; background: #fdfaf8; padding: 12px; border-radius: 10px; border: 1px solid #ece3db;">${safeWellnessExperiences || "None provided"}</div>
                                    </div>

                                    <div style="margin-bottom: 14px;">
                                        <span style="display: block; color: #7a7a7a; font-size: 12px; margin-bottom: 4px;">Open to suggestions?</span>
                                        <span style="color: #D19789; font-weight: 700;">${safeSuggestions}</span>
                                    </div>
                                </div>

                                <div style="margin-bottom: 8px;">
                                    <h3 style="color: #95a799; font-size: 15px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.6px;">Health & Dietary</h3>
                                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a; width: 40%;">Allergies:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a;">${safeAllergies || "None"}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #7a7a7a; vertical-align: top;">Health Notes:</td>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #f1e8df; color: #2a2a2a;">${safeHealthConsiderations || "None"}</td>
                                        </tr>
                                    </table>
                                </div>

                            </div>
                        </div>
                        
                        <p style="text-align: center; color: #7a7a7a; font-size: 12px; margin-top: 18px;">
                            Maps for Mom
                        </p>
                    </div>
                </div>
            `;
            try {
                const data = await Promise.all([
                    resend.emails.send({
                        from: 'Maps For Mom <hello@mapsformom.com>',
                        to: 'hello@mapsformom.com',
                        subject: `New Trip Inquiry: ${safeName}`,
                        html: MESSAGE_RECEIVED
                    }),

                    resend.emails.send({
                        from: 'Maps For Mom <hello@mapsformom.com>',
                        to: email,
                        subject: `Your journey starts here! ✈️`,
                        html: MESSAGE_CONFIRMATION
                    }),
                ]);

                // Verify both emails were sent successfully
                const [adminEmail, userEmail] = data;

                if (adminEmail.error || userEmail.error) {
                    throw new ActionError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: adminEmail.error?.message || userEmail.error?.message || "Failed to send email",
                    });
                }

                return {
                    success: true,
                    message: "Questionnaire submitted successfully. We'll be in touch soon!",
                };

            } catch (error) {
                // If it's already an ActionError, re-throw it
                if (error instanceof ActionError) {
                    throw error;
                }

                // Log the error for debugging (in production, use proper logging)
                console.error("Email sending error:", error);

                throw new ActionError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error instanceof Error ? error.message : "Failed to send email. Please try again later.",
                });
            }
        }
    })
};