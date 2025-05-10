import * as THREE from 'three';

export function createAvatar(options = {}) {
  const group = new THREE.Group();

  // Head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: options.headColor || 0xffccaa })
  );
  head.position.y = 2.5;
  group.add(head);

  // Torso
  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 1),
    new THREE.MeshStandardMaterial({ color: options.torsoColor || 0x00ff00 })
  );
  torso.position.y = 1;
  group.add(torso);

  // Arms
  const armMat = new THREE.MeshStandardMaterial({ color: options.armColor || 0x0000ff });
  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.5), armMat);
  leftArm.position.set(-1.25, 1.75, 0);
  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.5), armMat);
  rightArm.position.set(1.25, 1.75, 0);
  group.add(leftArm);
  group.add(rightArm);

  // Legs
  const legMat = new THREE.MeshStandardMaterial({ color: options.legColor || 0x0000ff });
  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.5), legMat);
  leftLeg.position.set(-0.5, -0.75, 0);
  const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.5), legMat);
  rightLeg.position.set(0.5, -0.75, 0);
  group.add(leftLeg);
  group.add(rightLeg);

  // Hat (optional)
  if (options.hat) {
    const hat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32),
      new THREE.MeshStandardMaterial({ color: options.hatColor || 0x000000 })
    );
    hat.position.y = 3.1;
    group.add(hat);
  }

  return group;
}
