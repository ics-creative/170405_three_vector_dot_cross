import * as THREE from 'three';
import {_} from 'lodash';

/**
 * パーティクルエミッタークラスです。
 */
export default class ParticleEmitter extends THREE.Object3D {

  /** パーティクルの数 */
  static PARTICLE_NUM = 3000;
  /** カラーリスト */
  static COLOR_LIST = [
    0xffff00,
    0xffffdd,
    0xffffff
  ];
  /** 球の半径 */
  static RADIUS = 50;

  /** パーティクルの入れ物 */
  _particleStore = [];
  /** テクスチャー */
  _texture = null;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // テクスチャ
    const loader = new THREE.TextureLoader();
    this._texture = loader.load('imgs/particle.png');

    // 数分のパーティクルを生成
    for(let index = 0; index < ParticleEmitter.PARTICLE_NUM; index++) {
      const particle = this._createParticle();
      this.add(particle);
      // ストアに追加
      this._particleStore.push(particle);
    }
  }

  /**
   * 粒を生成します。
   */
  _createParticle() {
    // ランダムに色を設定
    const rand = Math.floor(Math.random() * 3);
    const color = ParticleEmitter.COLOR_LIST[rand];

    // マテリアル
    const material = new THREE.SpriteMaterial({
      color: color,
      map: this._texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.3
    });

    // スプライト
    const sprite = new THREE.Sprite(material);

    // 球の表面にランダムに配置
    const phi = ((Math.random() * 180) - 90) * Math.PI / 180;
    const theta = (Math.random() * 360) * Math.PI / 180;
    const radius = ParticleEmitter.RADIUS;
    sprite.position.x = radius * Math.cos(phi) * Math.cos(theta) * -1;
    sprite.position.y = radius * Math.sin(phi);
    sprite.position.z = radius * Math.cos(phi) * Math.sin(theta);

    // ランダムに大きさを変更
    sprite.scale.multiplyScalar(Math.random() * 5 + 1);

    return sprite;
  }

  /**
   * フレーム毎の更新です。
   */
  update(lightFrontVector, aperture) {
    const target = lightFrontVector.clone();
    // 全てのパーティクルに対して照らされているか判定
    _.each(this._particleStore, (particle) => {
      // 絞り値から透明度の割合を算出
      const dot = particle.position.clone().normalize().dot(target);
      let opacity = (dot - (1 - aperture)) / aperture;
      // ちらつかせます
      opacity *= Math.random();
      // 透明度を設定
      particle.material.opacity = opacity;
    });
  }
}
