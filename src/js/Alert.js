export default class Alert {
  constructor() {
    this.path = '/json/alerts.json';
  }

  async init() {
    const response = await fetch(this.path);
    const alerts = await response.json();

    if (alerts.length > 0) {
      const alertList = document.createElement('section');
      alertList.classList.add('alert-list');

      alerts.forEach((alert) => {
        const alertMessage = document.createElement('p');
        alertMessage.textContent = alert.message;
        alertMessage.style.backgroundColor = alert.background;
        alertMessage.style.color = alert.color;

        alertList.appendChild(alertMessage);
      });

      document.querySelector('main').prepend(alertList);
    }
  }
}
