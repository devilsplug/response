import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a simple cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();


window.onload = () => {
  document.body.insertAdjacentHTML('afterbegin', `<div style="margin: 20px;">
  <h2>Register</h2>
  <input id="reg-username" placeholder="Username" />
  <input id="reg-password" type="password" placeholder="Password" />
  <button onclick="register()">Register</button>

  <h2>Login</h2>
  <input id="login-username" placeholder="Username" />
  <input id="login-password" type="password" placeholder="Password" />
  <button onclick="login()">Login</button>

  <p id="auth-message"></p>
</div>
`);
};

function register() {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;

  fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('auth-message').textContent = 'Registration successful';
    })
    .catch(err => {
      document.getElementById('auth-message').textContent = 'Registration failed';
    });
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        document.getElementById('auth-message').textContent = 'Login successful';
      } else {
        document.getElementById('auth-message').textContent = 'Login failed';
      }
    })
    .catch(err => {
      document.getElementById('auth-message').textContent = 'Login failed';
    });
}
