module.exports = {
  content: ["./*.{html,js}"],  
  theme: {
    extend: {},
  },/*
  colors: 
   { 'deep-blue': '273469',
     'light-blue': 'd7f9ff',
     'ivory': 'f9fbf2',
     'sea-green': '22ffcb',
     'deep-green': '0b5d1e',
     'titanium-yellow': 'ddd92a',
     'red': 'd1193b',
     'coal-black': '222111' },*/
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
