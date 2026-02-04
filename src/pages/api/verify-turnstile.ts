import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
    sendInquiry: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string().min(2),
            email: z.string().email(),
            // Validamos que el token de Turnstile llegue
            'cf-turnstile-response': z.string().min(1, "Captcha requerido"),
        }),
        handler: async (input) => {
            // 1. Validar el token con Cloudflare
            const verifyResponse = await fetch(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        secret: import.meta.env.TURNSTILE_SECRET_KEY,
                        response: input['cf-turnstile-response'],
                    }),
                }
            );

            const validation = await verifyResponse.json();

            if (!validation.success) {
                throw new Error("Fallo en la verificación de seguridad (Bot detectado)");
            }

            return { success: true, message: "¡Inquiry recibida!" };
        }
    })
}