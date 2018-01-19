import * as THREE from '../../libs/three.module.js';

/** 回転スピード */
const ROTATION_SPEED = 2.5;

/**
 * 懐中電灯クラスです。
 */
export default class FlashLight extends THREE.Object3D {



  get frontVector() {
    return this._frontVector;
  }

  get aperture() {
    return this._aperture;
  }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    /** 正面ベクトル */
    this._frontVector = new THREE.Vector3(0, 1, 0);

    /** 絞り値 */
    this._aperture = 0.2;

    /** 回転角度 */
    this._angle = 0;

    // 持ち手部分
    const handle = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 3, 10),
      new THREE.MeshBasicMaterial({
        color: 0xCCCCCC
      })
    );
    handle.rotation.z = -90 * Math.PI / 180;
    this.add(handle);

    // 頭
    const head = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1.5, 1, 1.5, 10),
      new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
      })
    );
    head.rotation.z = -90 * Math.PI / 180;
    head.position.x = 2;
    this.add(head);

    // ビーム
    const loader = new THREE.TextureLoader();
    const beamTexture = loader.load('imgs/beam.png');
    const beam = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(15, 0.5, 20, 40, 10, true),
      new THREE.MeshBasicMaterial({
        color: 0xFFFF55,
        opacity: 0.3,
        transparent: true,
        map: beamTexture,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      })
    );
    beam.rotation.z = -90 * Math.PI / 180;
    beam.position.x = 12;
    this.add(beam);
  }

  /**
   * フレーム毎のアップデートをします。
   */
  update() {
    // 角度をインクリメント
    this._angle += ROTATION_SPEED;
    const radian = this._angle * Math.PI / 180;

    // ライトを回転
    this.rotation.z = radian;

    // 正面ベクトルを更新
    const x = Math.cos(radian);
    const y = Math.sin(radian);
    this._frontVector = new THREE.Vector3(x, y, 0);
  }
}
