const socket = io();

socket.on('ArduinoMessage', function (data) {
  const values = data.split(',');
  const $tbody = document.getElementById('results');

  let content = '';

  values.forEach((element, index) => {
    content += templateTR(element, index);
  });
  $tbody.innerHTML = content;
});

function templateTR(value, index) {
  return `
    <tr class="table-${value > 0 ? 'primary' : 'danger'}">
      <th class="text-center" scope="row">Analoga</th>
      <td class="text-center">A${index}</td>
      <td class="text-center">${value}</td>
    </tr>
  `;
}