// Materials and geometry are modeled from property imagery, not survey drawings.
export function buildGenevaStorefront(THREE, scene, { box, mat, label }, doors) {
  const frame = mat('#242523');
  const offWhite = mat('#d9d5ca');
  const red = mat('#9a4439');
  const curb = mat('#aaa396');
  const asphalt = mat('#5e5a55');
  const concrete = mat('#bfb7a5');
  const stripe = mat('#dad0aa');
  const glass = new THREE.MeshPhysicalMaterial({
    color:0xbbcfcd, roughness:.23, transparent:true, opacity:.17, depthWrite:false, side:THREE.DoubleSide,
  });
  const z = 7;
  box(0,3.82,z,30,1.08,.28,offWhite);
  box(0,4.4,z,30.34,.18,.38,frame);
  box(-14.7,1.64,z,.55,3.28,.40,red);
  box(14.7,1.64,z,.55,3.28,.40,red);
  box(0,1.64,z,.58,3.28,.39,offWhite);
  const glassFloor = .22;
  const storefrontRail = mat('#914b37'); // rust-red mid-rail visible in the leasing photographs
  for (const door of doors) {
    const left = door.id === 'cafe' ? -14.4 : .30;
    const right = door.id === 'cafe' ? -.30 : 14.4;
    const edges = [left, door.x-1.08, door.x+1.08, right];
    for (const i of [0,2]) {
      const start = edges[i], end = edges[i+1];
      const width = end-start;
      const center = (start+end)*.5;
      box(center,1.72,z,width,3.0,.035,glass);
      for (let bay=0; bay<=3; bay++) {
        box(start+width*bay/3,1.70,z-.04,.076,3.08,.14,frame);
      }
      for (const y of [glassFloor,3.24]) box(center,y,z-.04,width,.079,.14,frame);
      box(center,1.10,z-.048,width,.15,.15,storefrontRail);
      for (let bar=1; bar<9; bar++) box(start+width*bar/9,.64,z-.087,.035,.86,.045,frame);
    }
    box(door.x,1.49,z,2.10,2.91,.045,glass);
    box(door.x,3.09,z,2.16,.49,.042,glass);
    for (const edge of [-1,1]) box(door.x+edge*1.08,1.68,z-.065,.095,3.15,.16,frame);
    for (const y of [.14,1.16,2.83,3.25]) box(door.x,y,z-.053,2.15,.098,.17,frame);
    box(door.x+.73,1.38,z-.15,.09,.35,.09,frame);
    label('EXIT',door.x,3.16,z-.22,'#826239',46,Math.PI);
  }

  // A daylight vista through the storefront. The playable lot is in HQ1.
  box(0,-.12,24,44,.18,33,asphalt);
  box(0,.01,8.3,31,.12,2.5,concrete);
  box(0,.066,9.55,31,.15,.18,curb);
  for (let i=0;i<8;i++) box(-13.9+i*3.98,.01,13.3,.10,.016,6.8,stripe);
  for (let i=0;i<6;i++) box(-12.5+i*4.8,.013,30.2,.095,.014,7.0,stripe);
  box(-19,-.06,24,3,.17,32,concrete);
  box(-23.5,-.07,24,6,.14,36,asphalt);
  box(-25.7,.01,22,.085,.027,31,stripe);
  box(-16.8,2.6,20,.16,5.2,.16,frame);
  box(-16.8,5.2,20,2.7,.78,.24,offWhite);
  const canopyGeometry = new THREE.IcosahedronGeometry(1.4,2);
  const canopy = mat('#778553');
  for (const x of [-16,-2,14]) {
    box(x,1.58,36,.22,3.2,.22,mat('#64574b'));
    const crown = new THREE.Mesh(canopyGeometry,canopy);
    crown.position.set(x,3.7,36);
    crown.scale.set(1.4,1,1.2);
    scene.add(crown);
  }
  const exterior = new THREE.DirectionalLight('#e6efff',1.72);
  exterior.position.set(-6,12,14);
  scene.add(exterior);
  return offWhite;
}

export function addInteriorFinish(THREE, scene, { box, mat }) {
  // Ceiling tile, timber-look flooring and acoustic wall details preserve furniture positions.
  const ceiling = mat('#cfcac0');
  const track = mat('#97968b');
  const boardA = mat('#9a795b');
  const boardB = mat('#a4876a');
  const plank = new THREE.BoxGeometry(3.735,.009,.327);
  const palette = [new THREE.InstancedMesh(plank,boardA,80),new THREE.InstancedMesh(plank,boardB,240)];
  const index = [0,0];
  const placement = new THREE.Matrix4();
  for (let i=0;i<40;i++) {
    for (let j=0;j<8;j++) {
      const variant = (i+j)%4===0 ? 0 : 1;
      placement.makeTranslation(-13.125+j*3.75,.003,-6.825+i*.345);
      palette[variant].setMatrixAt(index[variant]++,placement);
    }
  }
  scene.add(...palette);
  box(0,3.99,0,29.7,.02,13.7,ceiling);
  for (let x=-14.4;x<=14.5;x+=.9) box(x,3.975,0,.016,.008,13.7,track);
  for (let z=-6.75;z<=6.76;z+=.9) box(0,3.975,z,29.7,.008,.016,track);
  const panel = mat('#59635e');
  const batten = mat('#7b624f');
  for (const x of [4,6.5,9,11.5]) {
    box(x,2.12,-6.81,1.5,2.23,.092,panel);
    for (const offset of [-.55,-.28,0,.28,.55]) box(x+offset,2.12,-6.754,.034,2.2,.023,batten);
  }
}
