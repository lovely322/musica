window.addEventListener('load', iniciarReproductor);

let idFrame, reproduciendo = 0;
let listadoCanciones = [
  {
    titulo: 'Billie Eilish - WILDFLOWER',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba1.mp3',
    caratulaUrl: 'https://images.genius.com/9d5264bad7c4f816de9a75eb78689d32.1000x1000x1.png'
  },
  {
    titulo: 'Cigarettes After Sex - Cry',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba2.mp3',
    caratulaUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Cigarettes_After_Sex_-_Cry.png'
  },
  {
    titulo: 'Cigarettes After Sex - John Wayne',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba3.mp3',
    caratulaUrl: 'https://i.scdn.co/image/ab67616d0000b27312b69bf576f5e80291f75161'
  },
  {
    titulo: 'Joji - Glimpse Us',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba4.mp3',
    caratulaUrl: 'https://i.scdn.co/image/ab67616d0000b27312b69bf576f5e80291f75161'
  },
  {
    titulo: 'Lana del Rey - Salvatore',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba5.mp3',
    caratulaUrl: 'https://i1.sndcdn.com/artworks-000271546052-hs8vbr-t500x500.jpg'
  },
  {
    titulo: 'Lana del Rey - Ultraviolence',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba6.mp3',
    caratulaUrl: 'https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f'
  },
  {
    titulo: 'Luke Combs - Fast Car',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba7.mp3',
    caratulaUrl: 'https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f'
  },
  {
    titulo: 'The Fray - Look After You',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba8.mp3',
    caratulaUrl: 'https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f'
  },
  {
    titulo: 'The Weeknd - A Lesser Man',
    audioUrl: 'https://ia904507.us.archive.org/24/items/prueba9_202502/prueba9.mp3',
    caratulaUrl: 'https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f'
  },
  // Añade el resto de tus canciones aquí con este formato
];

let icono = [];
let cancion = {
  audio: new Audio(),
  URI: '',
  caratula: '',
  duracion: ''
};
let reproductor = {
  nodo: '',
  duracion: '',
  caratula: '',
  deslizador: [],
  boton: []
};




icono['pausa'] = 'bi-pause-circle-fill';
icono['reproducir'] = 'bi-play-circle-fill';
icono['volumenSilenciado'] = 'bi bi-volume-mute-fill';
icono['volumenBajo'] = 'bi bi-volume-down-fill';
icono['volumenAlto'] = 'bi bi-volume-up';

function iniciarReproductor() {
  reproductor.boton['reproducirPausa'] = document.querySelector('.controles__reproduccion .' + icono['reproducir']).parentElement;
  reproductor.boton['cancionSiguiente'] = document.querySelector('.controles__reproduccion .bi-skip-forward-fill').parentElement;
  reproductor.boton['cancionAnterior'] = document.querySelector('.controles__reproduccion .bi-skip-backward-fill').parentElement;
  reproductor.boton['volumen'] = document.querySelector('.controles__volumen button');
  reproductor.deslizador['volumen'] = document.querySelector('.controles__volumen input');
  reproductor.deslizador['progresoCancion'] = document.querySelector('.reproduccion__progreso input');

  reproductor.caratula = document.querySelector('.cancion__caratula img');
  reproductor.duracion = document.querySelector('.reproduccion__progreso time');
  reproductor.nodo = document.querySelector('.reproductor');

  reproductor.boton['reproducirPausa'].addEventListener('click', alternarReproduccion);
  reproductor.boton['cancionSiguiente'].addEventListener('click', () => cargarCancion(1));
  reproductor.boton['cancionAnterior'].addEventListener('click', () => cargarCancion(-1));
  reproductor.boton['volumen'].addEventListener('click', alternarDeslizadorVolumen);
  document.addEventListener('click', alternarDeslizadorVolumen);
  reproductor.deslizador['volumen'].addEventListener('input', moverVolumen);
  reproductor.deslizador['progresoCancion'].addEventListener('input', moverProgreso);

  reproductor['caratula'].style.animationPlayState = 'paused';

  cargarCancion(reproduciendo);
}

function moverProgreso(e) {
  let momento = e.target.value;
  cancion.audio.currentTime = momento;
}

function cargarCancion(sentido) {
  let cambiarA = reproduciendo + sentido;
  reproductor.caratula.classList.add('oculto');

  if (cambiarA >= listadoCanciones.length) reproduciendo = 0;
  else if (cambiarA < 0) reproduciendo = listadoCanciones.length - 1;
  else reproduciendo = cambiarA;

  // Cargar desde URLs en la nube
  cancion.URI = listadoCanciones[reproduciendo].audioUrl;
  cancion.caratula = listadoCanciones[reproduciendo].caratulaUrl;
  cancion.audio.src = cancion.URI;

  reproductor.caratula.src = cancion.caratula;
  reproductor.caratula.classList.remove('oculto');

  reproductor.deslizador['progresoCancion'].value = 0;

  cancion.audio.addEventListener('loadedmetadata', () => {
    cambiarCancion();
  });

  cancion.audio.addEventListener('error', (e) => {
    console.error('Error al cargar el audio:', e);
    // Puedes añadir aquí un manejo de errores visual
  });
}

function cambiarCancion() {
  cancion.duracion = duracionCancion(cancion.audio.duration);

  reproductor.duracion.innerText = `00:00/${cancion.duracion.minutos}:${cancion.duracion.segundos}`;
  reproductor.deslizador['progresoCancion'].max = cancion.audio.duration;

  document.querySelector('.cancion__titulo').innerText = listadoCanciones[reproduciendo].titulo;

  if (reproductor.boton['reproducirPausa'].firstChild.classList.contains(icono['pausa'])) {
    cancion.audio.play();
    actualizarReproductor();
  }
}

function duracionCancion(duracionS) {
  let minutos = Math.floor(duracionS / 60).toString().padStart(2, '0');
  let segundos = Math.floor(duracionS - minutos * 60).toString().padStart(2, '0');
  return { minutos, segundos };
}

function actualizarReproductor() {
  idFrame = requestAnimationFrame(actualizarReproductor);

  let momentoActual = duracionCancion(cancion.audio.currentTime);
  reproductor.duracion.innerText = `${momentoActual.minutos}:${momentoActual.segundos}/${cancion.duracion.minutos}:${cancion.duracion.segundos}`;

  reproductor.deslizador['progresoCancion'].value = cancion.audio.currentTime;

  if (cancion.audio.currentTime >= cancion.audio.duration - 0.5) {
    cargarCancion(1);
  }
}

function alternarReproduccion() {
  let pausar = reproductor.boton['reproducirPausa'].firstChild.classList.toggle(icono['reproducir']);
  reproductor.boton['reproducirPausa'].firstChild.classList.toggle(icono['pausa']);

  if (!pausar) {
    idFrame = requestAnimationFrame(actualizarReproductor);
    cancion.audio.play();
    reproductor['caratula'].style.animationPlayState = 'running';
    reproductor.nodo.classList.add('reproduciendo');
  } else {
    window.cancelAnimationFrame(idFrame);
    cancion.audio.pause();
    reproductor['caratula'].style.animationPlayState = 'paused';
    reproductor.nodo.classList.remove('reproduciendo');
  }
}

function alternarDeslizadorVolumen(e) {
  e.stopPropagation();
  if (e.target == reproductor.boton['volumen'] || e.target == reproductor.boton['volumen'].firstChild) {
    reproductor.deslizador['volumen'].classList.toggle('oculto');
  } else {
    reproductor.deslizador['volumen'].classList.add('oculto');
  }
}

function moverVolumen(e) {
  let volumen = e.target.value;
  cancion.audio.volume = volumen / 100;
  let iconoVolumen = reproductor.boton['volumen'].querySelector('i');

  if (volumen == 0) {
    iconoVolumen.className = icono['volumenSilenciado'];
  } else if (volumen <= 50) {
    iconoVolumen.className = icono['volumenBajo'];
  } else {
    iconoVolumen.className = icono['volumenAlto'];
  }
}