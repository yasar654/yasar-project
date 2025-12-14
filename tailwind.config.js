/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// Semantic theme colors using CSS variables
				background: "var(--color-background)",
				surface: "var(--color-surface)",
				header: "var(--color-header)",
				primary: {
					DEFAULT: "var(--color-primary)",
					hover: "var(--color-primary-hover)",
					light: "var(--color-primary-light)",
				},
				textPrimary: "var(--color-text-primary)",
				textSecondary: "var(--color-text-secondary)",
				textMuted: "var(--color-text-muted)",
				border: "var(--color-border)",
				// Accent colors for status indicators
				success: {
					DEFAULT: "var(--color-success-text)",
					bg: "var(--color-success-bg)",
					text: "var(--color-success-text)",
					border: "var(--color-success-border)",
				},
				warning: {
					DEFAULT: "var(--color-warning-text)",
					bg: "var(--color-warning-bg)",
					text: "var(--color-warning-text)",
					border: "var(--color-warning-border)",
				},
				danger: {
					DEFAULT: "var(--color-danger-text)",
					bg: "var(--color-danger-bg)",
					text: "var(--color-danger-text)",
					border: "var(--color-danger-border)",
				},
				info: {
					DEFAULT: "var(--color-info-text)",
					bg: "var(--color-info-bg)",
					text: "var(--color-info-text)",
					border: "var(--color-info-border)",
				},
				// Interactive focus color
				focus: "var(--color-focus)",
			},
			fontFamily: {
				sans: ["Poppins", "Inter", "system-ui", "sans-serif"],
			},
			borderRadius: {
				"2xl": "1rem",
				"3xl": "1.5rem",
			},
			boxShadow: {
				"warm-sm": "0 1px 2px 0 rgba(139, 90, 43, 0.05)",
				warm: "0 4px 6px -1px rgba(139, 90, 43, 0.1), 0 2px 4px -1px rgba(139, 90, 43, 0.06)",
				"warm-lg":
					"0 10px 15px -3px rgba(139, 90, 43, 0.15), 0 4px 6px -2px rgba(139, 90, 43, 0.1)",
				"warm-xl":
					"0 20px 25px -5px rgba(139, 90, 43, 0.15), 0 10px 10px -5px rgba(139, 90, 43, 0.08)",
				"warm-2xl": "0 25px 50px -12px rgba(139, 90, 43, 0.25)",
				card: "0 4px 12px -2px rgba(139, 90, 43, 0.08), 0 2px 6px -1px rgba(139, 90, 43, 0.06)",
				"card-hover":
					"0 12px 24px -4px rgba(139, 90, 43, 0.15), 0 4px 8px -2px rgba(139, 90, 43, 0.1)",
				btn: "0 2px 8px -2px rgba(139, 90, 43, 0.2)",
				"btn-hover": "0 4px 12px -2px rgba(139, 90, 43, 0.3)",
			},
			transitionDuration: {
				250: "250ms",
			},
			scale: {
				102: "1.02",
				103: "1.03",
			},
			animation: {
				"fade-in": "fadeIn 0.2s ease-out",
				"slide-up": "slideUp 0.3s ease-out",
				"scale-in": "scaleIn 0.2s ease-out",
				"pulse-soft": "pulseSoft 2s ease-in-out infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				scaleIn: {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				pulseSoft: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.7" },
				},
			},
		},
	},
	plugins: [],
};
