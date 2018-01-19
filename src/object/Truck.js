import * as THREE from 'three';

/**
 * トロッコクラスです。
 */
export default class Truck extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 本体
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 6),
      new THREE.MeshPhongMaterial({
        color: 0xCCCCCC
      })
    );
    body.position.y = 3;
    this.add(body);

    // 車輪１
    const wheel1 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xFFFF00
      })
    );
    wheel1.rotation.x = wheel1.rotation.z = 90 * Math.PI / 180;
    wheel1.position.y = 1;
    wheel1.position.z = -2;
    this.add(wheel1);

    // 車輪２
    const wheel2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xFFFF00
      })
    );
    wheel2.rotation.x = wheel2.rotation.z = 90 * Math.PI / 180;
    wheel2.position.y = 1;
    wheel2.position.z = 2;
    this.add(wheel2);
  }

  /**
   * フレーム毎の更新をします。
   */
  update() {

  }
}
