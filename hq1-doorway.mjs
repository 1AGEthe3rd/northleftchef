// The existing café and studio share the storefront along z=7.
export const parkingDoors = Object.freeze([
  { id:'cafe', x:-7.5 },
  { id:'studio', x:8 },
]);

export function parkingDoorAt(x, z) {
  if (z < 5.2 || z > 7) return null;
  return parkingDoors.find(door => Math.abs(x - door.x) <= 1.45) ?? null;
}

export function parkingUrl(door) {
  const url = new URL('https://1age.space/hq1/');
  url.searchParams.set('return', 'hq1-northleftchef');
  url.searchParams.set('door', parkingDoors.some(item => item.id === door) ? door : 'cafe');
  return url.href;
}

export function arrivalDoor(search) {
  const query = new URLSearchParams(search);
  if (query.get('from') !== 'hq1' || query.get('venue') !== 'hq1-northleftchef') return null;
  return parkingDoors.find(door => door.id === query.get('door')) ?? parkingDoors[0];
}

// The movement boundary is also the wall clamp. Using a higher threshold
 // can strand players at high frame rates or on slow analog input.
export const FRONT_LIMIT = 6.5;
export function crossedParkingDoor(x, z, nx, nz) {
  if (![x,z,nx,nz].every(Number.isFinite) || nz <= z || z > FRONT_LIMIT || nz < FRONT_LIMIT) return null;
  const t = (FRONT_LIMIT-z)/(nz-z);
  const crossingX = x+(nx-x)*t;
  return parkingDoors.find(door => Math.abs(crossingX-door.x) <= .93) ?? null;
}
