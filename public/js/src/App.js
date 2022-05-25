import * as THREE from '../libs/three.module.js';

/**
 * メインアプリクラスです。
 */
export class App {
  /**
   * @constructor
   * @param sceneInstance
   */
  constructor(sceneInstance) {
    this._update = this._update.bind(this);
    this._resize = this._resize.bind(this);

    // DOM
    this._wrapper = document.getElementById('app');

    // シーン
    this._scene = sceneInstance;

    // レンダラー
    this._renderer = new THREE.WebGLRenderer({ antialias: false });
    this._renderer.setClearColor(0x000000);
    this._renderer.setPixelRatio(1);
    this._wrapper.appendChild(this._renderer.domElement);

    // リサイズ
    this._resize();
    window.addEventListener('resize', this._resize);

    this.startTime = Date.now(); // ⭐️アニメーションの開始時間を格納する変数

    // フレーム毎の更新
    this._update();
  }

  /**
   * フレーム毎の更新です。
   */
  _update() {
    requestAnimationFrame(this._update);
    // シーンの更新
    this._scene.update(this.startTime);
    // 描画
    this._renderer.render(this._scene, this._scene.camera);
  }

  /**
   * リサイズをかけます。
   */
  _resize() {
    const width = this._wrapper.clientWidth;
    const height = this._wrapper.clientHeight;
    this._renderer.domElement.setAttribute('width', String(width));
    this._renderer.domElement.setAttribute('height', String(height));
    this._renderer.setPixelRatio(window.devicePixelRatio || 1.0);
    this._renderer.setSize(width, height);
    this._scene.camera.aspect = width / height;
    this._scene.camera.updateProjectionMatrix();
  }
}
