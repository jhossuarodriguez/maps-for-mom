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
                <div style="font-family: sans-serif; background-color: #f5f5f5; padding: 40px 20px; border-radius: 10px">
                    <div style="max-width: 600px; margin: 0 auto;">
                        
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img 
                                src="https://maps-for-mom.vercel.app/favicon.webp" 
                                alt="Logo Maps for Mom" 
                                style="height: 40px; width: auto;"
                            />
                        </div>

                        <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <h2 style="color: #333; margin-top: 0;">Your Journey Starts Here!</h2>
                            <p style="color: #666; line-height: 1.5;">
                                We’ve received your questionnaire ✨
                                Our team will review your details and reach out within 24 hours to begin curating your personalized travel experience.<br />
                                <br />
                                Sit back, relax… we’ve got the planning covered.
                            </p>
                        </div>
                        
                        <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                            © 2025 Maps for Mom. All rights reserved
                        </p>
                    </div>
                </div>
            `;

            const MESSAGE_RECEIVED = `
                <div style="font-family: sans-serif; background-color: #f5f5f5; padding: 40px 20px; border-radius: 10px">
                    <div style="max-width: 600px; margin: 0 auto;">
                        
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img 
                                src="https://maps-for-mom.vercel.app/logo-email.png" 
                                alt="Logo Maps for Mom" 
                                style="height: 40px; width: auto; border: 0;"
                            />
                        </div>

                        <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px; text-align: center;">New Trip Questionnaire ✨</h2>
                            
                            <p style="color: #666; font-size: 14px;">
                                <strong>From:</strong> ${safeName} <br>
                                <strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${safeEmail}</a>
                            </p>

                            <div style="margin-bottom: 25px;">
                                <h3 style="color: #e66d57; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Traveler Information</h3>
                                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888; width: 40%;">Phone:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${safePhone}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888;">Travelers:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${safeTravelers}</td>
                                    </tr>
                                </table>
                            </div>

                            <div style="margin-bottom: 25px;">
                                <h3 style="color: #e66d57; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Basics</h3>
                                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888; width: 40%;">Dates:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${safeTravelDates}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888;">Destination:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${safeDestination}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888;">Budget:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${safeBudget}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888;">Accommodation:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${safeAccommodation}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888;">Transport:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${safeTransportation}</td>
                                    </tr>
                                </table>
                            </div>

                            <div style="margin-bottom: 25px;">
                                <h3 style="color: #e66d57; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Vision & Interests</h3>
                                
                                <div style="margin-bottom: 15px;">
                                    <span style="display: block; color: #888; font-size: 12px; margin-bottom: 4px;">Reason for trip:</span>
                                    <div style="color: #333; background: #f9f9f9; padding: 10px; border-radius: 4px;">${safeReason}</div>
                                </div>

                                <div style="margin-bottom: 15px;">
                                    <span style="display: block; color: #888; font-size: 12px; margin-bottom: 4px;">Excited about:</span>
                                    <div style="color: #333; background: #f9f9f9; padding: 10px; border-radius: 4px;">${safeExcitedActivities}</div>
                                </div>

                                <div style="margin-bottom: 15px;">
                                    <span style="display: block; color: #888; font-size: 12px; margin-bottom: 4px;">Activities to avoid:</span>
                                    <div style="color: #333; background: #f9f9f9; padding: 10px; border-radius: 4px;">${safeAvoidActivities || "None provided"}</div>
                                </div>

                                <div style="margin-bottom: 15px;">
                                    <span style="display: block; color: #888; font-size: 12px; margin-bottom: 4px;">Ideal Getaway Description:</span>
                                    <div style="color: #333; background: #f9f9f9; padding: 10px; border-radius: 4px; font-style: italic;">"${safeIdealGetaway}"</div>
                                </div>
                                
                                <div style="margin-bottom: 15px;">
                                    <span style="display: block; color: #888; font-size: 12px; margin-bottom: 4px;">Wellness Requests:</span>
                                    <div style="color: #333; background: #f9f9f9; padding: 10px; border-radius: 4px;">${safeWellnessExperiences || "None provided"}</div>
                                </div>

                                <div style="margin-bottom: 15px;">
                                    <span style="display: block; color: #888; font-size: 12px; margin-bottom: 4px;">Open to suggestions?</span>
                                    <span style="color: #333; font-weight: bold;">${safeSuggestions}</span>
                                </div>
                            </div>

                            <div style="margin-bottom: 10px;">
                                <h3 style="color: #e66d57; font-size: 16px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Health & Dietary</h3>
                                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888; width: 40%;">Allergies:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${safeAllergies || "None"}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888; vertical-align: top;">Health Notes:</td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${safeHealthConsiderations || "None"}</td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                        
                        <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                            Maps for Mom
                        </p>
                    </div>
                </div>
            `;
            try {
                const data = await Promise.all([
                    resend.emails.send({
                        from: 'Maps For Mom <onboarding@resend.dev>',
                        to: 'jhossuarodriguezz@gmail.com',
                        subject: `New Trip Inquiry: ${safeName}`,
                        html: MESSAGE_RECEIVED
                    }),

                    resend.emails.send({
                        from: 'Maps For Mom <onboarding@resend.dev>',
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