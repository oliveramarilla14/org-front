export function setLocalFecha(fecha: number) {
  localStorage.setItem('fechaActual', fecha.toString());
}

export function getLocalFecha() {
  return localStorage.getItem('fechaActual');
}
