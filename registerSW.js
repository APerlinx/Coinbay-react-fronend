if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/Coinbay-react-fronend/sw.js', { scope: '/Coinbay-react-fronend/' })})}