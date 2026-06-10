const stage = document.querySelector(".stage");
const backgroundLayer = document.querySelector(".background-layer");
const blackFlower = document.querySelector(".black-flower");
const scriptTitle = document.querySelector(".script-title");
const trail = document.querySelector(".cursor-trail");
const title = document.querySelector("h1");
const ribbonLine = document.querySelector(".ribbon-line");
const ribbonPaths = document.querySelectorAll(".ribbon-stroke");
const detailVideo = document.querySelector(".detail-video");
const detailText = document.querySelector(".detail-text");
const epiphyllumText = document.querySelector(".epiphyllum-text");
const peonyText = document.querySelector(".peony-text");
const roseText = document.querySelector(".rose-text");
const dandelionText = document.querySelector(".dandelion-text");
const endingTitle = document.querySelector(".ending-title");
const text = "About Aquilegia";
const titleText = "FLOWERS";
const endingText = "FLOWERS";
const epiphyllumCopy =
  "Epiphyllum oxypetalum, commonly known as the queen of the night, is an epiphytic cactus in the family Cactaceae. It produces large, fragrant white flowers that open at night and usually wither by morning. Its nocturnal blooming pattern is closely associated with night-active pollinators, while its flattened photosynthetic stems reflect its adaptation to tropical and subtropical epiphytic habitats.";
const peonyCopy =
  "Paeonia, commonly known as peony, is a perennial flowering plant belonging to the family Paeoniaceae. It is characterized by large, multilayered flowers, deeply lobed leaves, and a well-developed root system. Peonies are widely distributed across temperate regions of Europe, Asia, and North America, with many cultivated varieties valued for their ornamental, cultural, and botanical significance. Their floral morphology often includes numerous petals and prominent reproductive structures, making them an important subject in horticulture, plant taxonomy, and decorative art.";
const roseCopy =
  "Rosa, commonly known as rose, is a woody perennial flowering plant belonging to the family Rosaceae. It is characterized by layered petals, compound leaves, and often prickled stems. Roses are widely cultivated for their ornamental value, fragrance, and morphological diversity, making them significant subjects in horticulture, plant breeding, and botanical studies.";
const dandelionCopy =
  "Taraxacum, commonly known as dandelion, is a perennial herbaceous plant belonging to the family Asteraceae. It is characterized by a basal rosette of deeply lobed leaves, hollow flowering stems, and yellow capitula composed of numerous ray florets. After flowering, it produces wind-dispersed achenes with pappus structures, enabling efficient seed dispersal and strong ecological adaptability in temperate environments.";
const lifeStages = [
  {
    startsAt: 0,
    title: "Bud Stage",
    body:
      "The black pansy belongs to the family Violaceae and the genus Viola. It prefers cool temperatures, sufficient light, and well-drained soil, and usually enters its active growth and budding stage under low-temperature conditions from autumn to early spring. During this stage, floral buds gradually differentiate; green sepals enclose the unopened petals, while anthocyanins begin to accumulate in the petal tissues, producing deep purple, bluish-purple, or nearly black coloration.",
  },
  {
    startsAt: 2,
    title: "Flowering Stage",
    body:
      'Under suitable temperatures, pansies generally bloom from late autumn to spring, and in some regions the flowering period may extend into early summer. Once the corolla opens, the flower displays a typical five-petaled structure. The so-called "black" coloration is not true pure black, but rather the visual result of high concentrations of anthocyanins combined with deep purple and dark blue pigments, giving the petals a near-black, velvety appearance.',
  },
  {
    startsAt: 4,
    title: "Withering Stage",
    body:
      "As the flowering period ends or environmental temperatures rise, the water content in petal cells decreases and the tissues gradually lose turgor pressure. This leads to curling, wrinkling, fading, or drying of the petals. High temperatures, strong light, or insufficient water supply can accelerate senescence, and the plant gradually transitions from its ornamental flowering stage to decline or seed-setting.",
  },
];
const peonyTexturePaths = {
  embossed: "assets/peony-embossed.png",
  metal: "assets/peony-metal.png",
  normal: "assets/peony-normal.png",
};
const peonyTextureAspect = 1672 / 941;
blackFlower.src = "assets/black-flower.png";

const splitFloatText = (content) =>
  [...content]
    .map((char) => {
      const value = char === " " ? "&nbsp;" : char;
      return `<span class="float-char">${value}</span>`;
    })
    .join("");

title.innerHTML = [...titleText]
  .map((letter) => `<span>${letter}</span>`)
  .join("");

scriptTitle.innerHTML = [...text]
  .map((letter, index) => {
    const content = letter === " " ? "&nbsp;" : letter;
    return `<span style="--i:${index}">${content}</span>`;
  })
  .join("");

if (detailText) {
  detailText.innerHTML = lifeStages
    .map(
      (stage, index) =>
        `<p class="life-text" data-stage="${index}"><span class="life-text-inner"><strong>${splitFloatText(`${stage.title}:`)}</strong> ${splitFloatText(stage.body)}</span></p>`
    )
    .join("");
}

if (epiphyllumText) {
  epiphyllumText.innerHTML = splitFloatText(epiphyllumCopy);
}

if (peonyText) {
  peonyText.innerHTML = splitFloatText(peonyCopy);
}

if (roseText) {
  roseText.innerHTML = splitFloatText(roseCopy);
}

if (dandelionText) {
  dandelionText.innerHTML = splitFloatText(dandelionCopy);
}

if (endingTitle) {
  endingTitle.innerHTML = splitFloatText(endingText);
}

let activeLifeStage = -1;
let epiphyllumTextVisible = false;
let peonyTextVisible = false;
let roseTextVisible = false;
let dandelionTextVisible = false;
let endingTextVisible = false;

const setFloatTextVisible = (element, visible, stateName) => {
  if (!element) return false;
  const current =
    stateName === "ending"
      ? endingTextVisible
      : stateName === "dandelion"
      ? dandelionTextVisible
      : stateName === "rose"
      ? roseTextVisible
      : stateName === "peony"
        ? peonyTextVisible
        : epiphyllumTextVisible;
  if (current === visible) return current;

  const chars = element.querySelectorAll(".float-char");

  if (!visible) {
    element.classList.remove("is-active");
    if (window.gsap && chars.length) {
      gsap.killTweensOf(chars);
      gsap.to(chars, {
        duration: 0.34,
        opacity: 0,
        yPercent: -120,
        scaleY: 0.72,
        scaleX: 1.08,
        stagger: { amount: 0.18, from: "start" },
        ease: "power2.in",
      });
    }
    return false;
  }

  if (window.gsap && chars.length) {
    gsap.killTweensOf(chars);
    gsap.set(chars, {
      willChange: "opacity, transform",
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: "50% 0%",
    });
  }

  requestAnimationFrame(() => {
    element.classList.add("is-active");
    if (window.gsap && chars.length) {
      gsap.to(chars, {
        duration: 0.82,
        ease: "back.inOut(2)",
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: { amount: 0.62, from: "start" },
      });
    }
  });
  return true;
};

const setLifeStage = (index) => {
  if (!detailText || index === activeLifeStage) return;

  const nextPanel = detailText.querySelector(`[data-stage="${index}"]`);
  if (!nextPanel) return;
  const nextChars = nextPanel.querySelectorAll(".float-char");

  detailText.querySelectorAll(".life-text").forEach((panel) => {
    if (panel === nextPanel) return;
    if (panel.classList.contains("is-active")) {
      panel.classList.add("is-leaving");
      if (window.gsap) {
        gsap.killTweensOf(panel.querySelectorAll(".float-char"));
        gsap.to(panel.querySelectorAll(".float-char"), {
          duration: 0.38,
          opacity: 0,
          yPercent: -135,
          scaleY: 0.72,
          scaleX: 1.08,
          stagger: {
            amount: 0.22,
            from: "start",
          },
          ease: "power2.in",
        });
      }
      window.setTimeout(() => panel.classList.remove("is-leaving"), 980);
    }
    panel.classList.remove("is-active");
  });

  nextPanel.classList.remove("is-leaving");
  if (window.gsap && nextChars.length) {
    gsap.killTweensOf(nextChars);
    gsap.set(nextChars, {
      willChange: "opacity, transform",
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: "50% 0%",
    });
  }

  requestAnimationFrame(() => {
    nextPanel.classList.add("is-active");
    if (window.gsap && nextChars.length) {
      gsap.to(nextChars, {
        duration: 0.82,
        ease: "back.inOut(2)",
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: {
          amount: 0.62,
          from: "start",
        },
      });
    }
  });
  activeLifeStage = index;
};

const updateLifeTextForTime = (time) => {
  const stageIndex =
    time >= lifeStages[2].startsAt ? 2 : time >= lifeStages[1].startsAt ? 1 : 0;
  setLifeStage(stageIndex);
};

const setEpiphyllumTextVisible = (visible) => {
  epiphyllumTextVisible = setFloatTextVisible(epiphyllumText, visible, "epiphyllum");
};

const setPeonyTextVisible = (visible) => {
  peonyTextVisible = setFloatTextVisible(peonyText, visible, "peony");
};

const setRoseTextVisible = (visible) => {
  roseTextVisible = setFloatTextVisible(roseText, visible, "rose");
};

const setDandelionTextVisible = (visible) => {
  dandelionTextVisible = setFloatTextVisible(dandelionText, visible, "dandelion");
};

const setEndingTextVisible = (visible) => {
  endingTextVisible = setFloatTextVisible(endingTitle, visible, "ending");
};

const prepareRibbon = () => {
  ribbonPaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.setProperty("--ribbon-length", length);
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });
};

const showVideoPreviewFrame = () => {
  if (!detailVideo || !Number.isFinite(detailVideo.duration)) return;
  detailVideo.currentTime = 0;
};

const drawRibbon = () => {
  window.setTimeout(() => {
    ribbonPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.transition = "none";
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      requestAnimationFrame(() => {
        path.style.transition = "stroke-dashoffset 2.45s cubic-bezier(0.55, 0.04, 0.08, 1)";
        path.style.strokeDashoffset = 0;
      });
    });
  }, 3950);
};

prepareRibbon();

let revealed = false;
let detailReady = false;
let detailTransitionStarted = false;
let detailProgress = 0;
let epiphyllumReady = false;
let epiphyllumProgress = 0;
let peonyReady = false;
let peonyProgress = 0;
let roseReady = false;
let roseProgress = 0;
let dandelionReady = false;
let dandelionProgress = 0;
let endingReady = false;
let endingProgress = 0;
let scrollGuardUntil = 0;
let scrollGuardDelta = 0;

const SCROLL_GUARD_MS = 520;
const SCROLL_GUARD_DELTA = 110;
const MAX_WHEEL_DELTA = 220;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const normalizeWheelDelta = (deltaY) => clamp(deltaY, -MAX_WHEEL_DELTA, MAX_WHEEL_DELTA);

const armScrollGuard = () => {
  scrollGuardUntil = performance.now() + SCROLL_GUARD_MS;
  scrollGuardDelta = 0;
};

const consumeScrollGuard = (deltaY) => {
  if (deltaY <= 0 || scrollGuardUntil <= 0) return false;

  scrollGuardDelta += Math.abs(deltaY);
  const stillWaiting =
    performance.now() < scrollGuardUntil || scrollGuardDelta < SCROLL_GUARD_DELTA;

  if (stillWaiting) return true;

  scrollGuardUntil = 0;
  scrollGuardDelta = 0;
  return false;
};

const visualProgress = {
  detail: 0,
  epiphyllum: 0,
  peony: 0,
  rose: 0,
  dandelion: 0,
  ending: 0,
};
const targetProgress = {
  detail: 0,
  epiphyllum: 0,
  peony: 0,
  rose: 0,
  dandelion: 0,
  ending: 0,
};
let progressAnimationFrame = 0;

const updateEpiphyllumFlowerMorph = (progress) => {
  const p = clamp(progress, 0, 1);
  const eased = smoothstep(0, 1, p);
  const x = 82.35 * eased;
  const y = 5.5 * eased;
  const scale = 1 + 0.12 * Math.sin(Math.PI * eased);
  const rotate = 430 * eased;
  const blackOpacity = 1 - smoothstep(0.52, 0.76, p);
  const epiphyllumOpacity = smoothstep(0.24, 0.54, p);

  stage.style.setProperty("--morph-x", `${x.toFixed(3)}vw`);
  stage.style.setProperty("--morph-y", `${y.toFixed(3)}vh`);
  stage.style.setProperty("--morph-rotate", `${rotate.toFixed(2)}deg`);
  stage.style.setProperty("--morph-scale", scale.toFixed(3));
  stage.style.setProperty("--black-morph-opacity", blackOpacity.toFixed(3));
  stage.style.setProperty("--epiphyllum-flower-opacity", epiphyllumOpacity.toFixed(3));
};

const updatePeonyFlowerMorph = (progress) => {
  const p = clamp(progress, 0, 1);
  const eased = smoothstep(0, 1, p);
  const x = -40.7 * eased;
  const y = -11.7 * eased;
  const scale = 1 + 0.08 * Math.sin(Math.PI * eased);
  const rotate = -330 * eased;
  const epiphyllumOpacity = 1 - smoothstep(0.46, 0.72, p);
  const peonyOpacity = smoothstep(0.24, 0.56, p);

  stage.style.setProperty("--peony-morph-x", `${x.toFixed(3)}vw`);
  stage.style.setProperty("--peony-morph-y", `${y.toFixed(3)}vh`);
  stage.style.setProperty("--peony-morph-rotate", `${rotate.toFixed(2)}deg`);
  stage.style.setProperty("--peony-morph-scale", scale.toFixed(3));
  stage.style.setProperty("--epiphyllum-to-peony-opacity", epiphyllumOpacity.toFixed(3));
  stage.style.setProperty("--peony-flower-opacity", peonyOpacity.toFixed(3));
};

const updateRoseFlowerMorph = (progress) => {
  const p = clamp(progress, 0, 1);
  const eased = smoothstep(0, 1, p);
  const x = -24 * Math.sin(Math.PI * eased);
  const y = 51.5 * eased;
  const arc = -27 * Math.sin(Math.PI * eased);
  const scale = 1 - 0.14 * eased + 0.12 * Math.sin(Math.PI * eased);
  const rotate = 520 * eased;
  const peonyOpacity = 1 - smoothstep(0.46, 0.76, p);
  const roseOpacity = smoothstep(0.32, 0.64, p);

  stage.style.setProperty("--rose-morph-x", `${x.toFixed(3)}vw`);
  stage.style.setProperty("--rose-morph-y", `${y.toFixed(3)}vh`);
  stage.style.setProperty("--rose-morph-arc", `${arc.toFixed(3)}vh`);
  stage.style.setProperty("--rose-morph-rotate", `${rotate.toFixed(2)}deg`);
  stage.style.setProperty("--rose-morph-scale", scale.toFixed(3));
  stage.style.setProperty("--peony-to-rose-opacity", peonyOpacity.toFixed(3));
  stage.style.setProperty("--rose-flower-opacity", roseOpacity.toFixed(3));
};

const updateDandelionFlowerMorph = (progress) => {
  const p = clamp(progress, 0, 1);
  const eased = smoothstep(0, 1, p);
  const x = 38 * eased + 24 * Math.sin(Math.PI * eased);
  const y = -44.5 * eased;
  const arc = -28 * Math.sin(Math.PI * eased);
  const scale = 1 - 0.18 * eased + 0.18 * Math.sin(Math.PI * eased);
  const rotate = -500 * eased;
  const roseOpacity = 1 - smoothstep(0.46, 0.76, p);
  const dandelionOpacity = smoothstep(0.32, 0.64, p);

  stage.style.setProperty("--dandelion-morph-x", `${x.toFixed(3)}vw`);
  stage.style.setProperty("--dandelion-morph-y", `${y.toFixed(3)}vh`);
  stage.style.setProperty("--dandelion-morph-arc", `${arc.toFixed(3)}vh`);
  stage.style.setProperty("--dandelion-morph-rotate", `${rotate.toFixed(2)}deg`);
  stage.style.setProperty("--dandelion-morph-scale", scale.toFixed(3));
  stage.style.setProperty("--rose-to-dandelion-opacity", roseOpacity.toFixed(3));
  stage.style.setProperty("--dandelion-flower-opacity", dandelionOpacity.toFixed(3));
};

const updateDetailFlowerMotion = (progress) => {
  const p = clamp(progress, 0, 1);
  const remaining = 1 - p;
  stage.style.setProperty("--detail-enter-x", `${(-41.65 * p).toFixed(3)}vw`);
  stage.style.setProperty("--detail-enter-y", `${(-23.8 * p).toFixed(3)}vh`);
  stage.style.setProperty("--detail-flower-x", `${(41.65 * remaining).toFixed(3)}vw`);
  stage.style.setProperty("--detail-flower-y", `${(23.8 * remaining).toFixed(3)}vh`);
  stage.style.setProperty("--detail-flower-rotate", `${(-145 * remaining).toFixed(2)}deg`);
  stage.style.setProperty("--detail-flower-scale", `${(0.74 + p * 0.26).toFixed(3)}`);
  stage.style.setProperty("--detail-copy-y", `${(-72 * p).toFixed(3)}vh`);
  stage.style.setProperty("--detail-ribbon-y", `${(-72 * p).toFixed(3)}vh`);
};

const applyVisualProgress = (name, value) => {
  const progress = clamp(value, 0, 1);
  stage.style.setProperty(`--${name}-progress`, progress.toFixed(3));

  if (name === "detail") {
    updateDetailFlowerMotion(progress);
  }

  if (name === "epiphyllum") {
    updateEpiphyllumFlowerMorph(progress);
  }

  if (name === "peony") {
    updatePeonyFlowerMorph(progress);
  }

  if (name === "rose") {
    updateRoseFlowerMorph(progress);
  }

  if (name === "dandelion") {
    updateDandelionFlowerMorph(progress);
  }
};

const finishReadyTransitions = () => {
  if (!detailReady && targetProgress.detail >= 1 && visualProgress.detail >= 0.998) {
    enterDetail();
  }

  if (!epiphyllumReady && targetProgress.epiphyllum >= 1 && visualProgress.epiphyllum >= 0.998) {
    enterEpiphyllum();
  }

  if (!peonyReady && targetProgress.peony >= 1 && visualProgress.peony >= 0.998) {
    enterPeony();
  }

  if (!roseReady && targetProgress.rose >= 1 && visualProgress.rose >= 0.998) {
    enterRose();
  }

  if (!dandelionReady && targetProgress.dandelion >= 1 && visualProgress.dandelion >= 0.998) {
    enterDandelion();
  }

  if (!endingReady && targetProgress.ending >= 1 && visualProgress.ending >= 0.998) {
    enterEnding();
  }
};

const renderVisualProgress = () => {
  progressAnimationFrame = 0;
  let needsNextFrame = false;

  Object.keys(visualProgress).forEach((name) => {
    const current = visualProgress[name];
    const target = targetProgress[name];
    const next = current + (target - current) * 0.24;

    if (Math.abs(target - next) > 0.002) {
      visualProgress[name] = next;
      needsNextFrame = true;
    } else {
      visualProgress[name] = target;
    }

    applyVisualProgress(name, visualProgress[name]);
  });

  if (needsNextFrame) {
    progressAnimationFrame = requestAnimationFrame(renderVisualProgress);
  } else {
    finishReadyTransitions();
  }
};

const setVisualProgress = (name, value, immediate = false) => {
  const progress = clamp(value, 0, 1);
  targetProgress[name] = progress;

  if (immediate) {
    visualProgress[name] = progress;
    applyVisualProgress(name, progress);
    return;
  }

  if (!progressAnimationFrame) {
    progressAnimationFrame = requestAnimationFrame(renderVisualProgress);
  }
};

const resetTransitionProgress = (name) => {
  targetProgress[name] = 0;
  visualProgress[name] = 0;
  applyVisualProgress(name, 0);
};

const updateDetailProgress = (progress) => {
  detailProgress = clamp(progress, 0, 1);
  setVisualProgress("detail", detailProgress);

  if (detailProgress > 0) {
    detailTransitionStarted = true;
    document.body.classList.add("is-detail-transition");
    stage.classList.add("to-detail");
    activeTrailImages = pansyTrailImages;
  } else if (!detailReady) {
    detailTransitionStarted = false;
    document.body.classList.remove("is-detail-transition");
    stage.classList.remove("to-detail");
    activeTrailImages = trailImages;
  }

  if (detailVideo && !detailReady) {
    detailVideo.pause();
  }
};

const enterDetail = () => {
  if (detailReady) return;
  detailReady = true;
  document.body.classList.add("is-detail");
  stage.classList.add("detail");
  stage.classList.remove("to-detail");
  setVisualProgress("detail", 1, true);
  resetTransitionProgress("epiphyllum");
  activeTrailImages = pansyTrailImages;
  imageIndex = 0;
  armScrollGuard();

  if (detailVideo) {
    detailVideo.pause();
    if (Number.isFinite(detailVideo.duration)) {
      showVideoPreviewFrame();
    } else {
      detailVideo.load();
    }
  }

  updateLifeTextForTime(0);
};

const leaveDetailToHome = () => {
  if (!detailReady) return;
  detailReady = false;
  detailProgress = 1;
  document.body.classList.remove("is-detail");
  document.body.classList.add("is-detail-transition");
  stage.classList.remove("detail");
  stage.classList.add("to-detail");
  setVisualProgress("detail", 1, true);
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
};

let epiphyllumWebglStarted = false;

const initEpiphyllumWebgl = () => {
  if (epiphyllumWebglStarted || !epiphyllumCanvas) return;

  const gl = epiphyllumCanvas.getContext("webgl", {
    antialias: true,
    premultipliedAlpha: false,
    powerPreference: "high-performance",
  });

  if (!gl) return;
  epiphyllumWebglStarted = true;

  const vertexShaderSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;

    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform sampler2D uImage;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uImageAspect;
    uniform float uTime;
    uniform float uStrength;
    uniform float uScrollProgress;

    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    vec3 auroraColor(float t) {
      vec3 c1 = vec3(1.0, 0.20, 0.04);
      vec3 c2 = vec3(1.0, 0.72, 0.13);
      vec3 c3 = vec3(0.56, 0.95, 0.68);
      vec3 c4 = vec3(0.15, 0.78, 0.95);
      vec3 c5 = vec3(0.03, 0.10, 0.52);
      vec3 a = mix(c1, c2, smoothstep(0.0, 0.25, t));
      vec3 b = mix(a, c3, smoothstep(0.22, 0.52, t));
      vec3 c = mix(b, c4, smoothstep(0.48, 0.76, t));
      return mix(c, c5, smoothstep(0.72, 1.0, t));
    }

    vec2 coverUv(vec2 uv) {
      float screenAspect = uResolution.x / uResolution.y;
      vec2 result = uv;

      if (screenAspect > uImageAspect) {
        float scale = screenAspect / uImageAspect;
        result.y = (uv.y - 0.5) / scale + 0.5;
      } else {
        float scale = uImageAspect / screenAspect;
        result.x = (uv.x - 0.5) / scale + 0.5;
      }

      return result;
    }

    void main() {
      vec2 uv = coverUv(vUv);
      vec3 imageColor = texture2D(uImage, uv).rgb;
      float lum = dot(imageColor, vec3(0.299, 0.587, 0.114));

      vec3 whiteLayer = mix(vec3(lum), imageColor, 0.12);
      whiteLayer = mix(whiteLayer, vec3(0.88, 0.89, 0.87), 0.28);

      vec3 darkLayer = imageColor * vec3(0.08, 0.12, 0.22);
      darkLayer += vec3(0.01, 0.018, 0.055);

      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      vec2 p = (vUv - uMouse) * aspect;
      float d = length(p);

      float wave = noise(vec2(vUv.x * 3.1 + uTime * 0.055, uTime * 0.04));
      float smallWave = noise(vUv * 7.0 + vec2(-uTime * 0.04, uTime * 0.03));
      float mouseLift = (uMouse.x - 0.5) * 0.08 + (uMouse.y - 0.5) * 0.04;
      float boundary = clamp(uScrollProgress * 1.26 - 0.12 + mouseLift, -0.22, 1.22);
      float horizon = boundary + (wave - 0.5) * 0.13 + sin(vUv.x * 5.4 + uTime * 0.34) * 0.025;
      float feather = 0.24 + smallWave * 0.08;
      float verticalReveal = 1.0 - smoothstep(horizon - feather, horizon + feather, vUv.y);

      float inner = 0.24 + wave * 0.025;
      float outer = 0.66 + wave * 0.045;
      float mouseReveal = (1.0 - smoothstep(inner, outer, d)) * 0.24 * uStrength;
      float reveal = clamp(max(verticalReveal, mouseReveal) * smoothstep(0.0, 0.08, uScrollProgress), 0.0, 1.0);

      float edgeCenter = abs(vUv.y - horizon);
      float edge = exp(-edgeCenter * edgeCenter / 0.016) * smoothstep(0.02, 0.98, uScrollProgress) * (1.0 - smoothstep(0.98, 1.08, uScrollProgress));
      edge *= 0.5 + 0.5 * smoothstep(0.0, 0.58, d + 0.12);
      float veil = exp(-edgeCenter * edgeCenter / 0.09) * smoothstep(0.0, 0.95, uScrollProgress);

      float flow = fract(vUv.y * 0.76 + vUv.x * 0.25 + uTime * 0.035 + noise(vUv * 3.0 + uTime * 0.03) * 0.18);
      vec3 bandColor = auroraColor(flow);
      float grain = noise(vUv * 230.0 + uTime * 0.42);

      vec3 color = mix(whiteLayer, darkLayer, reveal);
      color += bandColor * edge * (0.78 + grain * 0.22);
      color += bandColor * veil * 0.1;
      color += (grain - 0.5) * 0.018 * edge;

      float alpha = clamp(reveal + edge * 0.9 + veil * 0.32, 0.0, 1.0);
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const createShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  };

  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderSource));
  gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {
    image: gl.getUniformLocation(program, "uImage"),
    resolution: gl.getUniformLocation(program, "uResolution"),
    mouse: gl.getUniformLocation(program, "uMouse"),
    imageAspect: gl.getUniformLocation(program, "uImageAspect"),
    time: gl.getUniformLocation(program, "uTime"),
    strength: gl.getUniformLocation(program, "uStrength"),
    scrollProgress: gl.getUniformLocation(program, "uScrollProgress"),
  };

  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([22, 26, 34, 255])
  );
  gl.uniform1i(uniforms.image, 0);
  gl.uniform1f(uniforms.imageAspect, epiphyllumTextureAspect);

  const image = new Image();
  image.src = epiphyllumTexturePath;
  image.addEventListener(
    "load",
    () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    },
    { once: true }
  );

  const pointer = {
    x: 0.5,
    y: 0.18,
    targetX: 0.5,
    targetY: 0.18,
    strength: 0.62,
    targetStrength: 0.62,
  };

  const resize = () => {
    const rect = epiphyllumCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    const width = Math.max(2, Math.round(rect.width * dpr));
    const height = Math.max(2, Math.round(rect.height * dpr));

    if (epiphyllumCanvas.width !== width || epiphyllumCanvas.height !== height) {
      epiphyllumCanvas.width = width;
      epiphyllumCanvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    gl.uniform2f(uniforms.resolution, width, height);
  };

  const updatePointer = (event) => {
    const rect = epiphyllumCanvas.getBoundingClientRect();
    pointer.targetX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    pointer.targetY = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
    pointer.targetStrength = 1;
  };

  epiphyllumCanvas.addEventListener("pointerenter", updatePointer, { passive: true });
  epiphyllumCanvas.addEventListener("pointermove", updatePointer, { passive: true });
  epiphyllumCanvas.addEventListener(
    "pointerleave",
    () => {
      pointer.targetStrength = 0.62;
    },
    { passive: true }
  );
  window.addEventListener("resize", resize, { passive: true });

  const render = () => {
    resize();
    pointer.x += (pointer.targetX - pointer.x) * 0.12;
    pointer.y += (pointer.targetY - pointer.y) * 0.12;
    pointer.strength += (pointer.targetStrength - pointer.strength) * 0.08;
    gl.uniform2f(uniforms.mouse, pointer.x, pointer.y);
    gl.uniform1f(uniforms.time, performance.now() * 0.001);
    gl.uniform1f(uniforms.strength, pointer.strength);
    gl.uniform1f(uniforms.scrollProgress, epiphyllumReady ? 1 : epiphyllumProgress);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  };

  resize();
  render();
};

const updateEpiphyllumProgress = (progress) => {
  epiphyllumProgress = clamp(progress, 0, 1);
  setVisualProgress("epiphyllum", epiphyllumProgress);

  if (epiphyllumProgress > 0) {
    stage.classList.add("to-epiphyllum");
    document.body.classList.add("is-epiphyllum-transition");
    setPeonyTextVisible(false);
    setRoseTextVisible(false);
    setDandelionTextVisible(false);
    setEndingTextVisible(false);
    if (epiphyllumProgress > 0.88) {
      setEpiphyllumTextVisible(true);
    } else {
      setEpiphyllumTextVisible(false);
    }
  } else if (!epiphyllumReady) {
    stage.classList.remove("to-epiphyllum");
    document.body.classList.remove("is-epiphyllum-transition");
    setEpiphyllumTextVisible(false);
    setPeonyTextVisible(false);
    setRoseTextVisible(false);
    setDandelionTextVisible(false);
    setEndingTextVisible(false);
  }

  if (detailVideo) {
    detailVideo.pause();
  }
};

const enterEpiphyllum = () => {
  if (epiphyllumReady) return;
  epiphyllumReady = true;
  document.body.classList.add("is-epiphyllum");
  document.body.classList.remove("is-detail", "is-epiphyllum-transition");
  stage.classList.add("epiphyllum");
  stage.classList.remove("detail", "to-epiphyllum");
  setVisualProgress("epiphyllum", 1, true);
  resetTransitionProgress("peony");
  setEpiphyllumTextVisible(true);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
  activeTrailImages = pansyTrailImages;
  armScrollGuard();
  if (trail) {
    trail.querySelectorAll(".trail-flower").forEach((flower) => {
      flower.style.opacity = "0";
      flower.style.visibility = "hidden";
    });
  }
};

const leaveEpiphyllumToDetail = () => {
  if (!epiphyllumReady) return;
  epiphyllumReady = false;
  document.body.classList.remove("is-epiphyllum");
  document.body.classList.add("is-detail", "is-epiphyllum-transition");
  stage.classList.remove("epiphyllum");
  stage.classList.add("detail", "to-epiphyllum");
  setVisualProgress("epiphyllum", epiphyllumProgress);
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
};

const updatePeonyProgress = (progress) => {
  peonyProgress = clamp(progress, 0, 1);
  setVisualProgress("peony", peonyProgress);

  if (peonyProgress > 0) {
    stage.classList.add("to-peony");
    document.body.classList.add("is-peony-transition");
    setEpiphyllumTextVisible(false);
    setRoseTextVisible(false);
    setDandelionTextVisible(false);
    setEndingTextVisible(false);
    if (peonyProgress > 0.9) {
      setPeonyTextVisible(true);
    } else {
      setPeonyTextVisible(false);
    }
  } else if (!peonyReady) {
    stage.classList.remove("to-peony");
    document.body.classList.remove("is-peony-transition");
    if (epiphyllumReady) setEpiphyllumTextVisible(true);
    setPeonyTextVisible(false);
    setRoseTextVisible(false);
    setDandelionTextVisible(false);
    setEndingTextVisible(false);
  }

  if (detailVideo) {
    detailVideo.pause();
  }
};

const enterPeony = () => {
  if (peonyReady) return;
  peonyReady = true;
  document.body.classList.add("is-peony");
  document.body.classList.remove("is-epiphyllum", "is-peony-transition");
  stage.classList.add("peony");
  stage.classList.remove("detail", "epiphyllum", "to-peony");
  setVisualProgress("peony", 1, true);
  resetTransitionProgress("rose");
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(true);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
  activeTrailImages = pansyTrailImages;
  armScrollGuard();
  if (trail) {
    trail.querySelectorAll(".trail-flower").forEach((flower) => {
      flower.style.opacity = "0";
      flower.style.visibility = "hidden";
    });
  }
  initPeonyThree();
};

const leavePeonyToEpiphyllum = () => {
  if (!peonyReady) return;
  peonyReady = false;
  epiphyllumReady = true;
  peonyProgress = 1;
  document.body.classList.remove("is-peony");
  document.body.classList.add("is-epiphyllum", "is-peony-transition");
  stage.classList.remove("peony");
  stage.classList.add("epiphyllum", "to-peony");
  setVisualProgress("peony", 1, true);
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
  activeTrailImages = pansyTrailImages;
};

const updateRoseProgress = (progress) => {
  roseProgress = clamp(progress, 0, 1);
  setVisualProgress("rose", roseProgress);

  if (roseProgress > 0) {
    stage.classList.add("to-rose");
    document.body.classList.add("is-rose-transition");
    document.body.classList.remove("is-peony");
    setPeonyTextVisible(false);
    setDandelionTextVisible(false);
    setEndingTextVisible(false);
    activeTrailImages = roseTrailImages;

    if (roseProgress > 0.86) {
      setRoseTextVisible(true);
    } else {
      setRoseTextVisible(false);
    }
  } else if (!roseReady) {
    stage.classList.remove("to-rose");
    document.body.classList.remove("is-rose-transition");
    document.body.classList.add("is-peony");
    activeTrailImages = pansyTrailImages;
    if (peonyReady) setPeonyTextVisible(true);
    setRoseTextVisible(false);
    setDandelionTextVisible(false);
    setEndingTextVisible(false);
  }

  if (detailVideo) {
    detailVideo.pause();
  }
};

const enterRose = () => {
  if (roseReady) return;
  roseReady = true;
  peonyReady = false;
  document.body.classList.add("is-rose");
  document.body.classList.remove("is-peony", "is-rose-transition");
  stage.classList.add("rose");
  stage.classList.remove("detail", "epiphyllum", "peony", "to-rose");
  setVisualProgress("rose", 1, true);
  resetTransitionProgress("dandelion");
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(true);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
  activeTrailImages = roseTrailImages;
  imageIndex = 0;
  armScrollGuard();
};

const leaveRoseToPeony = () => {
  if (!roseReady) return;
  roseReady = false;
  peonyReady = true;
  roseProgress = 1;
  document.body.classList.remove("is-rose");
  document.body.classList.add("is-peony", "is-rose-transition");
  stage.classList.remove("rose");
  stage.classList.add("peony", "to-rose");
  setVisualProgress("rose", 1, true);
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
  activeTrailImages = pansyTrailImages;
};

const updateDandelionProgress = (progress) => {
  dandelionProgress = clamp(progress, 0, 1);
  setVisualProgress("dandelion", dandelionProgress);

  if (dandelionProgress > 0) {
    stage.classList.add("to-dandelion");
    document.body.classList.add("is-dandelion-transition");
    document.body.classList.remove("is-rose");
    setRoseTextVisible(false);
    activeTrailImages = dandelionTrailImages;
    setEndingTextVisible(false);

    if (dandelionProgress > 0.86) {
      setDandelionTextVisible(true);
    } else {
      setDandelionTextVisible(false);
    }
  } else if (!dandelionReady) {
    stage.classList.remove("to-dandelion");
    document.body.classList.remove("is-dandelion-transition");
    document.body.classList.add("is-rose");
    activeTrailImages = roseTrailImages;
    if (roseReady) setRoseTextVisible(true);
    setDandelionTextVisible(false);
    setEndingTextVisible(false);
  }

  if (detailVideo) {
    detailVideo.pause();
  }
};

const enterDandelion = () => {
  if (dandelionReady) return;
  dandelionReady = true;
  roseReady = false;
  document.body.classList.add("is-dandelion");
  document.body.classList.remove("is-rose", "is-dandelion-transition");
  stage.classList.add("dandelion");
  stage.classList.remove("detail", "epiphyllum", "peony", "rose", "to-dandelion");
  setVisualProgress("dandelion", 1, true);
  resetTransitionProgress("ending");
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(true);
  setEndingTextVisible(false);
  activeTrailImages = dandelionTrailImages;
  imageIndex = 0;
  armScrollGuard();
};

const leaveDandelionToRose = () => {
  if (!dandelionReady) return;
  dandelionReady = false;
  roseReady = true;
  dandelionProgress = 1;
  document.body.classList.remove("is-dandelion");
  document.body.classList.add("is-rose", "is-dandelion-transition");
  stage.classList.remove("dandelion");
  stage.classList.add("rose", "to-dandelion");
  setVisualProgress("dandelion", 1, true);
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
  activeTrailImages = roseTrailImages;
};

const updateEndingProgress = (progress) => {
  endingProgress = clamp(progress, 0, 1);
  setVisualProgress("ending", endingProgress);
  const eased = smoothstep(0, 1, endingProgress);
  const arc = Math.sin(Math.PI * eased);
  stage.style.setProperty("--ending-flower-x", `${(38 - 14 * eased - 8 * arc).toFixed(3)}vw`);
  stage.style.setProperty("--ending-flower-y", `${(-38 - 42 * eased - 10 * arc).toFixed(3)}vh`);
  stage.style.setProperty("--ending-flower-rotate", `${(220 * eased).toFixed(2)}deg`);
  stage.style.setProperty("--ending-flower-scale", `${(1 - 0.32 * eased).toFixed(3)}`);

  if (endingProgress > 0) {
    stage.classList.add("to-ending");
    document.body.classList.add("is-ending-transition");
    document.body.classList.remove("is-dandelion");
    setDandelionTextVisible(false);
    activeTrailImages = endingTrailImages;

    if (endingProgress > 0.78) {
      setEndingTextVisible(true);
    } else {
      setEndingTextVisible(false);
    }
  } else if (!endingReady) {
    stage.classList.remove("to-ending");
    document.body.classList.remove("is-ending-transition");
    document.body.classList.add("is-dandelion");
    activeTrailImages = dandelionTrailImages;
    if (dandelionReady) setDandelionTextVisible(true);
    setEndingTextVisible(false);
  }

  if (detailVideo) {
    detailVideo.pause();
  }
};

const enterEnding = () => {
  if (endingReady) return;
  endingReady = true;
  dandelionReady = false;
  document.body.classList.add("is-ending");
  document.body.classList.remove("is-dandelion", "is-ending-transition");
  stage.classList.add("ending");
  stage.classList.remove("detail", "epiphyllum", "peony", "rose", "dandelion", "to-ending");
  setVisualProgress("ending", 1, true);
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(true);
  activeTrailImages = endingTrailImages;
  imageIndex = 0;
  armScrollGuard();
};

const leaveEndingToDandelion = () => {
  if (!endingReady) return;
  endingReady = false;
  dandelionReady = true;
  endingProgress = 1;
  document.body.classList.remove("is-ending");
  document.body.classList.add("is-dandelion", "is-ending-transition");
  stage.classList.remove("ending");
  stage.classList.add("dandelion", "to-ending");
  setVisualProgress("ending", 1, true);
  setEpiphyllumTextVisible(false);
  setPeonyTextVisible(false);
  setRoseTextVisible(false);
  setDandelionTextVisible(false);
  setEndingTextVisible(false);
  activeTrailImages = dandelionTrailImages;
};

let peonyThreeStarted = false;

const initPeonyFallback = (peonyArt) => {
  if (!peonyArt || peonyArt.classList.contains("webgl-ready")) return;
  peonyArt.classList.add("fallback-metal");
  const peonyTrail = [
    { x: 50, y: 50 },
    { x: 50, y: 50 },
  ];

  const updateFallbackPointer = (event) => {
    const rect = peonyArt.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    peonyTrail[1].x += (peonyTrail[0].x - peonyTrail[1].x) * 0.38;
    peonyTrail[1].y += (peonyTrail[0].y - peonyTrail[1].y) * 0.38;
    peonyTrail[0].x += (x - peonyTrail[0].x) * 0.62;
    peonyTrail[0].y += (y - peonyTrail[0].y) * 0.62;
    peonyArt.style.setProperty("--mx", `${x}%`);
    peonyArt.style.setProperty("--my", `${y}%`);
    peonyArt.style.setProperty("--mx1", `${peonyTrail[0].x}%`);
    peonyArt.style.setProperty("--my1", `${peonyTrail[0].y}%`);
    peonyArt.style.setProperty("--mx2", `${peonyTrail[1].x}%`);
    peonyArt.style.setProperty("--my2", `${peonyTrail[1].y}%`);
    peonyArt.classList.add("is-hovering");
  };

  peonyArt.addEventListener("pointerenter", updateFallbackPointer, { passive: true });
  peonyArt.addEventListener("pointermove", updateFallbackPointer, { passive: true });
  peonyArt.addEventListener(
    "pointerleave",
    () => {
      peonyArt.classList.remove("is-hovering");
    },
    { passive: true }
  );
};

const initPeonyThree = async () => {
  if (peonyThreeStarted) return;

  const peonyArt = document.querySelector(".peony-art");
  const mount = document.querySelector(".peony-webgl");
  if (!peonyArt || !mount) return;

  initPeonyFallback(peonyArt);
  return;

  peonyThreeStarted = true;

  try {
    const THREE = await import("./vendor/three.module.js").catch(() =>
      import("https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js")
    );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 16 / 9, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const loadTexture = (path) =>
      new Promise((resolve, reject) => loader.load(path, resolve, undefined, reject));

    const [embossedMap, metalMap, normalMap] = await Promise.all([
      loadTexture(peonyTexturePaths.embossed),
      loadTexture(peonyTexturePaths.metal),
      loadTexture(peonyTexturePaths.normal),
    ]);

    [embossedMap, metalMap].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    normalMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const geometry = new THREE.PlaneGeometry(1, 1, 128, 72);
    const peonyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uEmbossedMap: { value: embossedMap },
        uMetalMap: { value: metalMap },
        uNormalMap: { value: normalMap },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uTrail1: { value: new THREE.Vector2(0.5, 0.5) },
        uTrail2: { value: new THREE.Vector2(0.5, 0.5) },
        uTrail3: { value: new THREE.Vector2(0.5, 0.5) },
        uStrength: { value: 0 },
        uLight: { value: new THREE.Vector2(0.5, 0.5) },
        uInner: { value: 0.014 },
        uOuter: { value: 0.205 },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uEmbossedMap;
        uniform sampler2D uMetalMap;
        uniform sampler2D uNormalMap;
        uniform vec2 uPointer;
        uniform vec2 uTrail1;
        uniform vec2 uTrail2;
        uniform vec2 uTrail3;
        uniform float uStrength;
        uniform vec2 uLight;
        uniform float uInner;
        uniform float uOuter;

        varying vec2 vUv;

        float luminance(vec3 color) {
          return dot(color, vec3(0.299, 0.587, 0.114));
        }

        void main() {
          vec3 baseColor = texture2D(uEmbossedMap, vUv).rgb;
          vec3 metalColor = texture2D(uMetalMap, vUv).rgb;
          vec3 normalColor = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;

          normalColor.xy *= 0.96;
          vec3 normal = normalize(vec3(normalColor.xy, max(normalColor.z, 0.18)));

          vec2 aspectUv = vec2(vUv.x, vUv.y * 0.5625);
          vec2 aspectPointer = vec2(uPointer.x, uPointer.y * 0.5625);
          vec2 aspectTrail1 = vec2(uTrail1.x, uTrail1.y * 0.5625);
          vec2 aspectTrail2 = vec2(uTrail2.x, uTrail2.y * 0.5625);
          vec2 aspectTrail3 = vec2(uTrail3.x, uTrail3.y * 0.5625);

          float mainCircle = 1.0 - smoothstep(uInner, uOuter, distance(aspectUv, aspectPointer));
          float trailOne = 1.0 - smoothstep(uInner * 1.15, uOuter * 1.28, distance(aspectUv, aspectTrail1));
          float trailTwo = 1.0 - smoothstep(uInner * 1.2, uOuter * 1.42, distance(aspectUv, aspectTrail2));
          float trailThree = 1.0 - smoothstep(uInner * 1.25, uOuter * 1.58, distance(aspectUv, aspectTrail3));

          float circularMask = max(mainCircle, max(trailOne * 0.36, max(trailTwo * 0.18, trailThree * 0.09)));
          float mask = circularMask * circularMask * (3.0 - 2.0 * circularMask);
          mask *= uStrength;
          float softGlow = (1.0 - smoothstep(uOuter * 0.52, uOuter * 1.55, distance(aspectUv, aspectPointer))) * uStrength;

          vec2 lightUv = (uLight - 0.5) * vec2(1.4, 0.8);
          vec3 lightDir = normalize(vec3(lightUv.x, lightUv.y, 1.55));
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float diffuse = max(dot(normal, lightDir), 0.0);
          float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
          vec3 halfDir = normalize(lightDir + viewDir);
          float specular = pow(max(dot(normal, halfDir), 0.0), 92.0) * mask;

          vec3 baseLit = baseColor * (0.82 + diffuse * 0.24);
          vec3 silverTint = vec3(0.92, 0.96, 1.0);
          vec3 metalSilver = mix(vec3(luminance(metalColor)), metalColor, 0.72) * silverTint;
          vec3 metalLit = metalSilver * (0.74 + diffuse * 0.56);
          metalLit += vec3(0.92, 0.96, 1.0) * specular * 0.72;
          metalLit += vec3(0.68, 0.74, 0.82) * rim * mask * 0.1;
          metalLit += vec3(0.82, 0.86, 0.92) * softGlow * 0.055;

          vec3 color = mix(baseLit, metalLit, clamp(mask * 0.88 + softGlow * 0.075, 0.0, 1.0));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const peonyPlane = new THREE.Mesh(geometry, peonyMaterial);
    scene.add(peonyPlane);

    const pointer = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      strength: 0,
      targetStrength: 0,
    };
    const trailPoints = [
      { x: 0.5, y: 0.5, speed: 0.12 },
      { x: 0.5, y: 0.5, speed: 0.075 },
      { x: 0.5, y: 0.5, speed: 0.048 },
    ];
    const planeSize = {
      width: 1,
      height: 1,
    };
    const viewSize = {
      width: 1,
      height: 1,
    };

    const resize = () => {
      const rect = peonyArt.getBoundingClientRect();
      const width = Math.max(2, Math.round(rect.width));
      const height = Math.max(2, Math.round(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const fov = THREE.MathUtils.degToRad(camera.fov);
      const viewHeight = 2 * Math.tan(fov / 2) * camera.position.z;
      const viewWidth = viewHeight * camera.aspect;
      viewSize.width = viewWidth;
      viewSize.height = viewHeight;

      if (viewWidth / viewHeight > peonyTextureAspect) {
        planeSize.width = viewWidth;
        planeSize.height = viewWidth / peonyTextureAspect;
      } else {
        planeSize.height = viewHeight;
        planeSize.width = viewHeight * peonyTextureAspect;
      }

      peonyPlane.scale.set(planeSize.width, planeSize.height, 1);
    };

    const updatePointer = (event) => {
      const rect = peonyArt.getBoundingClientRect();
      const xRatio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const yRatio = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      const worldX = (xRatio - 0.5) * viewSize.width;
      const worldY = (0.5 - yRatio) * viewSize.height;
      pointer.targetX = clamp(worldX / planeSize.width + 0.5, 0, 1);
      pointer.targetY = clamp(worldY / planeSize.height + 0.5, 0, 1);
      pointer.targetStrength = 1;
      peonyMaterial.uniforms.uLight.value.set(xRatio, 1 - yRatio);
    };

    const updateShader = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.22;
      pointer.y += (pointer.targetY - pointer.y) * 0.22;
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.12;
      trailPoints.forEach((point, index) => {
        const lead = index === 0 ? pointer : trailPoints[index - 1];
        point.x += (lead.x - point.x) * point.speed;
        point.y += (lead.y - point.y) * point.speed;
      });
      peonyMaterial.uniforms.uPointer.value.set(pointer.x, pointer.y);
      peonyMaterial.uniforms.uTrail1.value.set(trailPoints[0].x, trailPoints[0].y);
      peonyMaterial.uniforms.uTrail2.value.set(trailPoints[1].x, trailPoints[1].y);
      peonyMaterial.uniforms.uTrail3.value.set(trailPoints[2].x, trailPoints[2].y);
      peonyMaterial.uniforms.uStrength.value = Math.min(0.86, pointer.strength);
    };

    const render = () => {
      updateShader();
      const t = performance.now() * 0.001;
      peonyPlane.rotation.x = Math.sin(t * 0.52) * 0.012;
      peonyPlane.rotation.y = Math.cos(t * 0.42) * 0.014;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    peonyArt.addEventListener("pointerenter", updatePointer, { passive: true });
    peonyArt.addEventListener("pointermove", updatePointer, { passive: true });
    peonyArt.addEventListener(
      "pointerleave",
      () => {
        pointer.targetStrength = 0;
      },
      { passive: true }
    );
    window.addEventListener("resize", resize, { passive: true });

    resize();
    render();
    peonyArt.classList.add("webgl-ready");
    peonyArt.classList.remove("fallback-metal", "is-hovering");
  } catch (error) {
    peonyThreeStarted = false;
    initPeonyFallback(peonyArt);
    console.warn("Three.js peony effect failed; using image fallback.", error);
  }
};

const reveal = () => {
  if (revealed) return;
  revealed = true;
  document.body.classList.add("is-revealed");
  stage.classList.add("revealed");
  drawRibbon();
};

requestAnimationFrame(() => {
  backgroundLayer.getBoundingClientRect();
});

stage.addEventListener("pointerdown", reveal, { once: true, passive: true });

const sceneSteps = [
  { hash: "#detail", update: () => updateDetailProgress(1), enter: enterDetail },
  { hash: "#epiphyllum", update: () => updateEpiphyllumProgress(1), enter: enterEpiphyllum },
  { hash: "#peony", update: () => updatePeonyProgress(1), enter: enterPeony },
  { hash: "#rose", update: () => updateRoseProgress(1), enter: enterRose },
  { hash: "#dandelion", update: () => updateDandelionProgress(1), enter: enterDandelion },
  { hash: "#ending", update: () => updateEndingProgress(1), enter: enterEnding },
];

const jumpToHashScene = () => {
  const targetIndex = sceneSteps.findIndex((step) => step.hash === window.location.hash);
  if (targetIndex < 0) return;

  reveal();
  window.setTimeout(() => {
    sceneSteps.slice(0, targetIndex + 1).forEach((step) => {
      step.update();
      step.enter();
    });
    scrollGuardUntil = 0;
    scrollGuardDelta = 0;
  }, 120);
};

if (window.location.hash === "#revealed") {
  reveal();
} else {
  jumpToHashScene();
}

const trailImages = [
  "assets/trail/flower-1.png",
  "assets/trail/flower-2.png",
  "assets/trail/flower-3.png",
  "assets/trail/flower-4.png",
  "assets/trail/flower-5.png",
  "assets/trail/flower-6.png",
  "assets/trail/flower-7.png",
  "assets/trail/flower-8.png",
];

const pansyTrailImages = [
  "assets/pansy/pansy-1.png",
  "assets/pansy/pansy-2.png",
  "assets/pansy/pansy-3.png",
  "assets/pansy/pansy-4.png",
  "assets/pansy/pansy-5.png",
  "assets/pansy/pansy-6.png",
  "assets/pansy/pansy-7.png",
];

const roseTrailImages = [
  "assets/rose-trail/1.png",
  "assets/rose-trail/2.png",
  "assets/rose-trail/3.png",
  "assets/rose-trail/4.png",
  "assets/rose-trail/5.png",
  "assets/rose-trail/6.png",
  "assets/rose-trail/7.png",
  "assets/rose-trail/8.png",
];

const dandelionTrailImages = [
  "assets/dandelion-trail/1.png",
  "assets/dandelion-trail/2.png",
  "assets/dandelion-trail/3.png",
];

const endingTrailImages = [
  "assets/ending-trail/flower-1.png",
  "assets/ending-trail/flower-2.png",
  "assets/ending-trail/flower-3.png",
  "assets/ending-trail/flower-4.png",
  "assets/ending-trail/flower-5.png",
  "assets/ending-trail/flower-6.png",
  "assets/ending-trail/flower-7.png",
  "assets/ending-trail/flower-8.png",
];

let activeTrailImages = trailImages;
let imageIndex = 0;

const initCursorTrail = () => {
  if (!window.gsap || !trail) return;

  const flowerPool = Array.from({ length: 46 }, (_, index) => {
    const image = document.createElement("img");
    image.className = "trail-flower";
    image.alt = "";
    image.decoding = "async";
    image.src = trailImages[index % trailImages.length];
    trail.appendChild(image);
    return image;
  });

  const wrapFlower = gsap.utils.wrap(0, flowerPool.length);
  const randomScale = gsap.utils.random(0.56, 0.96, 0.01, true);
  const randomRotation = gsap.utils.random(-34, 34, 1, true);
  const randomDrift = gsap.utils.random(-56, 56, 1, true);
  const randomRoseScale = gsap.utils.random(0.58, 0.98, 0.01, true);
  const randomRoseDrift = gsap.utils.random(-146, 146, 1, true);
  const randomRoseOffset = gsap.utils.random(-52, 52, 1, true);
  const randomDandelionScale = gsap.utils.random(0.56, 0.92, 0.01, true);
  const randomDandelionDrift = gsap.utils.random(-132, 132, 1, true);
  const randomDandelionOffset = gsap.utils.random(-42, 42, 1, true);
  let poolIndex = 0;
  let lastX = 0;
  let lastY = 0;
  let hasPointer = false;

  const showTrailFlower = (x, y) => {
    const isRoseTrail =
      roseReady || document.body.classList.contains("is-rose-transition");
    const isDandelionTrail =
      dandelionReady || document.body.classList.contains("is-dandelion-transition");
    const isEndingTrail =
      endingReady || document.body.classList.contains("is-ending-transition");
    if (
      !isRoseTrail &&
      !isDandelionTrail &&
      !isEndingTrail &&
      (epiphyllumReady ||
        peonyReady ||
        document.body.classList.contains("is-epiphyllum-transition") ||
        document.body.classList.contains("is-peony-transition"))
    ) {
      return;
    }

    const flower = flowerPool[wrapFlower(poolIndex++)];
    const travelDistance = isDandelionTrail
      ? -(y + gsap.utils.random(80, 240))
      : window.innerHeight - y + gsap.utils.random(isRoseTrail ? 180 : 120, isRoseTrail ? 520 : 320);
    const imageSet = activeTrailImages.length ? activeTrailImages : trailImages;

    flower.src = imageSet[imageIndex % imageSet.length];
    imageIndex += 1;

    gsap.killTweensOf(flower);
    gsap.set(flower, {
      x,
      y,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      rotation: randomRotation(),
      autoAlpha: 1,
      width: "",
    });

    gsap
      .timeline()
      .to(flower, {
        scale: isDandelionTrail ? randomDandelionScale() : isRoseTrail ? randomRoseScale() : randomScale(),
        duration: isRoseTrail || isDandelionTrail ? 0.18 : 0.28,
        ease: "back.out(2.4)",
      })
      .to(
        flower,
        {
          x: x + (isDandelionTrail ? randomDandelionDrift() : isRoseTrail ? randomRoseDrift() : randomDrift()),
          y: y + travelDistance,
          rotation: `+=${randomRotation()}`,
          scale: 0,
          autoAlpha: 0,
          duration: isDandelionTrail ? 4.8 : isRoseTrail ? 2.05 : 1.45,
          ease: isDandelionTrail ? "sine.out" : "power2.in",
          clearProps: "visibility,width",
        },
        0.14
      );
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      if (!hasPointer) {
        hasPointer = true;
        lastX = event.clientX;
        lastY = event.clientY;
        showTrailFlower(lastX, lastY);
        return;
      }

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const distance = Math.hypot(dx, dy);

      const isRoseTrail =
        roseReady || document.body.classList.contains("is-rose-transition");
      const isDandelionTrail =
        dandelionReady || document.body.classList.contains("is-dandelion-transition");
      const isEndingTrail =
        endingReady || document.body.classList.contains("is-ending-transition");
      const minDistance = isDandelionTrail ? 62 : isRoseTrail ? 78 : isEndingTrail ? 72 : 64;

      if (distance < minDistance) return;

      lastX = event.clientX;
      lastY = event.clientY;
      if (isDandelionTrail) {
        showTrailFlower(lastX + randomDandelionOffset(), lastY + randomDandelionOffset());
        showTrailFlower(lastX + randomDandelionOffset(), lastY + randomDandelionOffset());
      } else if (isRoseTrail) {
        showTrailFlower(lastX + randomRoseOffset(), lastY + randomRoseOffset());
      } else {
        showTrailFlower(lastX, lastY);
      }
    },
    { passive: true }
  );
};

window.addEventListener(
  "wheel",
  (event) => {
    if (!revealed) return;
    const deltaY = normalizeWheelDelta(event.deltaY);

    if (!detailReady) {
      event.preventDefault();
      updateDetailProgress(detailProgress + deltaY / 1150);

      if (detailProgress >= 1 && visualProgress.detail >= 0.985) {
        enterDetail();
      }
      return;
    }

    event.preventDefault();

    if (endingReady) {
      if (deltaY < 0) {
        leaveEndingToDandelion();
        updateEndingProgress(endingProgress + deltaY / 1050);
      }
      return;
    }

    if (consumeScrollGuard(deltaY)) {
      return;
    }

    if (!endingReady && endingProgress > 0) {
      updateEndingProgress(endingProgress + deltaY / 1050);

      if (endingProgress >= 1 && visualProgress.ending >= 0.985) {
        enterEnding();
      }
      return;
    }

    if (!dandelionReady && dandelionProgress > 0) {
      updateDandelionProgress(dandelionProgress + deltaY / 1050);

      if (dandelionProgress >= 1 && visualProgress.dandelion >= 0.985) {
        enterDandelion();
      }
      return;
    }

    if (!roseReady && roseProgress > 0) {
      updateRoseProgress(roseProgress + deltaY / 1050);

      if (roseProgress >= 1 && visualProgress.rose >= 0.985) {
        enterRose();
      }
      return;
    }

    if (!peonyReady && peonyProgress > 0) {
      updatePeonyProgress(peonyProgress + deltaY / 1050);

      if (peonyProgress >= 1 && visualProgress.peony >= 0.985) {
        enterPeony();
      }
      return;
    }

    if (!epiphyllumReady && epiphyllumProgress > 0) {
      updateEpiphyllumProgress(epiphyllumProgress + deltaY / 1050);

      if (epiphyllumProgress >= 1 && visualProgress.epiphyllum >= 0.985) {
        enterEpiphyllum();
      }
      return;
    }

    if (dandelionReady) {
      if (deltaY < 0) {
        leaveDandelionToRose();
        updateDandelionProgress(dandelionProgress + deltaY / 1050);
        return;
      }

      updateEndingProgress(endingProgress + deltaY / 1050);

      if (endingProgress >= 1 && visualProgress.ending >= 0.985) {
        enterEnding();
      }
      return;
    }

    if (roseReady) {
      if (deltaY < 0) {
        leaveRoseToPeony();
        updateRoseProgress(roseProgress + deltaY / 1050);
        return;
      }

      updateDandelionProgress(dandelionProgress + deltaY / 1050);

      if (dandelionProgress >= 1 && visualProgress.dandelion >= 0.985) {
        enterDandelion();
      }
      return;
    }

    if (peonyReady) {
      if (deltaY < 0) {
        leavePeonyToEpiphyllum();
        updatePeonyProgress(peonyProgress + deltaY / 1050);
        return;
      }

      updateRoseProgress(roseProgress + deltaY / 1050);

      if (roseProgress >= 1 && visualProgress.rose >= 0.985) {
        enterRose();
      }
      return;
    }

    if (epiphyllumReady) {
      if (deltaY < 0 && peonyProgress <= 0) {
        leaveEpiphyllumToDetail();
        updateEpiphyllumProgress(epiphyllumProgress + deltaY / 1050);
        return;
      }

      updatePeonyProgress(peonyProgress + deltaY / 1050);

      if (peonyProgress >= 1 && visualProgress.peony >= 0.985) {
        enterPeony();
      }
      return;
    }

    if (!detailVideo || !Number.isFinite(detailVideo.duration)) return;

    const atVideoEnd = detailVideo.currentTime >= detailVideo.duration - 0.08;
    if (atVideoEnd && deltaY > 0) {
      updateEpiphyllumProgress(epiphyllumProgress + deltaY / 1050);

      if (epiphyllumProgress >= 1 && visualProgress.epiphyllum >= 0.985) {
        enterEpiphyllum();
      }
      return;
    }

    const step = deltaY * 0.0028;
    const nextTime = Math.min(
      detailVideo.duration,
      Math.max(0, detailVideo.currentTime + step)
    );

    detailVideo.currentTime = nextTime;
    detailVideo.pause();
    updateLifeTextForTime(nextTime);

    if (nextTime <= 0.02 && deltaY < 0) {
      leaveDetailToHome();
      updateDetailProgress(detailProgress + deltaY / 1150);
    }
  },
  { passive: false }
);

const replayActiveFloatText = () => {
  if (!window.gsap || !detailText) return;
  const activePanel = detailText.querySelector(".life-text.is-active");
  if (!activePanel) return;
  const chars = activePanel.querySelectorAll(".float-char");
  if (!chars.length) return;

  gsap.killTweensOf(chars);
  gsap.fromTo(
    chars,
    {
      willChange: "opacity, transform",
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: "50% 0%",
    },
    {
      duration: 0.82,
      ease: "back.inOut(2)",
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: {
        amount: 0.62,
        from: "start",
      },
    }
  );
};

const initGsapEffects = () => {
  initCursorTrail();
  replayActiveFloatText();
};

if (window.gsap) {
  initGsapEffects();
} else {
  const gsapScript = document.createElement("script");
  gsapScript.src = "vendor/gsap.min.js";
  gsapScript.async = true;
  gsapScript.addEventListener(
    "error",
    () => {
      const fallbackScript = document.createElement("script");
      fallbackScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
      fallbackScript.async = true;
      fallbackScript.addEventListener("load", initGsapEffects, { once: true });
      document.head.appendChild(fallbackScript);
    },
    { once: true }
  );
  gsapScript.addEventListener("load", initGsapEffects, { once: true });
  document.head.appendChild(gsapScript);
}
