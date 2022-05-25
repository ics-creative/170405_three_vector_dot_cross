import * as THREE from '../../libs/three.module.js';
import Camera from '../camera/Camera.js';
import FlashLight from '../object/FlashLight.js';
import ParticleEmitter from '../object/ParticleEmitter.js';

/**
 * ステップ１シーンクラスです。
 */
export default class StepOneScene extends THREE.Scene {
  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    /** カメラ */
    this.camera = new Camera();
    this.camera.position.x = 10;
    this.camera.position.y = 50;
    this.camera.position.z = 10;

    // 環境光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    /** 懐中電灯 */
    this._flashLight = new FlashLight();
    this.add(this._flashLight);

    /** パーティクルエミッター */
    this._particleEmitter = new ParticleEmitter();
    this.add(this._particleEmitter);
  }

  /**
   * 更新します。
   */
  update(startTime) {
    // カメラを更新
    this.camera.update();

    // ライトを更新
    this._flashLight.update(startTime);

    // パーティクルを更新
    this._particleEmitter.update(
      this._flashLight.frontVector,
      this._flashLight.aperture
    );
  }
}
