import * as THREE from 'three';

/**
 * 懐中電灯クラスです。
 */
export default class FlashLight extends THREE.Object3D {

  /** 回転スピード */
  static ROTATION_SPEED = 2.5;

  /** 正面ベクトル */
  _frontVector = new THREE.Vector3(0, 1, 0);
  get frontVector() { return this._frontVector; }

  /** 絞り値 */
  _aperture = 0.2;
  get aperture() { return this._aperture; }

  /** 回転角度 */
  _angle = 0;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 持ち手部分
    let handle = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 3, 10),
      new THREE.MeshBasicMaterial({
        color: 0xCCCCCC
      })
    );
    handle.rotation.z = -90 * Math.PI / 180;
    this.add(handle);

    // 頭
    let head = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1.5, 1, 1.5, 10),
      new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
      })
    );
    head.rotation.z = -90 * Math.PI / 180;
    head.position.x = 2;
    this.add(head);

    // ビーム
    let loader = new THREE.TextureLoader();
    let beamTexture = loader.load('imgs/beam.png');
    let beam = new THREE.Mesh(
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
    this._angle += FlashLight.ROTATION_SPEED;
    let radian = this._angle * Math.PI / 180;

    // ライトを回転
    this.rotation.z = radian;

    // 正面ベクトルを更新
    let x = Math.cos(radian);
    let y = Math.sin(radian);
    this._frontVector = new THREE.Vector3(x, y, 0);
  }
}
