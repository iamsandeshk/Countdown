
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'dancing': ['Dancing Script', 'cursive'],
				'poppins': ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'number-flip': {
					'0%': { transform: 'rotateX(0deg)', opacity: '1' },
					'50%': { transform: 'rotateX(90deg)', opacity: '0.5' },
					'100%': { transform: 'rotateX(0deg)', opacity: '1' }
				},
				'birthday-float-1': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-8px) translateX(3px) rotate(1deg)' },
					'50%': { transform: 'translateY(-4px) translateX(-2px) rotate(-0.5deg)' },
					'75%': { transform: 'translateY(-12px) translateX(1px) rotate(1.5deg)' }
				},
				'birthday-float-2': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
					'30%': { transform: 'translateY(-6px) translateX(-3px) rotate(-1deg)' },
					'60%': { transform: 'translateY(-10px) translateX(2px) rotate(0.8deg)' },
					'90%': { transform: 'translateY(-3px) translateX(-1px) rotate(-0.3deg)' }
				},
				'birthday-float-3': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
					'20%': { transform: 'translateY(-5px) translateX(2px) rotate(0.5deg)' },
					'40%': { transform: 'translateY(-8px) translateX(-1px) rotate(-1deg)' },
					'80%': { transform: 'translateY(-6px) translateX(3px) rotate(1.2deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1.2s ease-out forwards',
				'fade-out': 'fade-out 1.2s ease-out forwards',
				'slide-up': 'slide-up 0.8s ease-out forwards',
				'slide-down': 'slide-down 0.8s ease-out forwards',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
				'number-flip': 'number-flip 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
				'birthday-float-1': 'birthday-float-1 8s ease-in-out infinite',
				'birthday-float-2': 'birthday-float-2 7s ease-in-out infinite',
				'birthday-float-3': 'birthday-float-3 9s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
