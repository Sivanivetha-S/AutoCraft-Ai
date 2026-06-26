// ─────────────────────────────────────────────
// Mock AI Engine — swap these functions for real
// API calls when backend is ready.
// ─────────────────────────────────────────────

const CRAFT_DATABASE = {
  paper: [
    {
      id: 'paper-vase',
      title: 'Modern Origami Vase',
      category: 'Home Decor',
      difficulty: 'Easy',
      time: '45 min',
      skill: 'Beginner',
      cost: '₹80',
      costUSD: '$1',
      sustainability: 92,
      emoji: '🏺',
      color: '#E4C441',
      description: 'Transform ordinary paper into an elegant geometric vase using Japanese origami folding techniques. Perfect for dried flowers or as a standalone decorative piece.',
      additionalMaterials: ['Glue stick', 'Ruler', 'Pencil', 'Scissors'],
      steps: [
        { n: 1, title: 'Prepare Paper', desc: 'Cut paper into 20x20 cm squares. You will need 6 sheets for a medium vase.' },
        { n: 2, title: 'Score Guidelines', desc: 'Lightly score fold lines every 2 cm using a ruler and blunt knife for crisp folds.' },
        { n: 3, title: 'Fold Base Module', desc: 'Fold each sheet into a triangular module following the origami base pattern.' },
        { n: 4, title: 'Assemble Structure', desc: 'Interlock modules together without glue — friction holds the shape.' },
        { n: 5, title: 'Shape the Vase', desc: 'Gently push inward at the waist to create the classic vase silhouette.' },
        { n: 6, title: 'Seal & Finish', desc: 'Apply a light coat of Mod Podge to stiffen and waterproof the structure.' },
      ],
      safetyTips: ['Use a cutting mat when scoring', 'Adult supervision for children under 8', 'Keep away from direct water without sealing'],
      environmentalImpact: 'Diverts 15g of paper from landfill. 100% biodegradable.',
    },
    {
      id: 'paper-organizer',
      title: 'Desk Organizer',
      category: 'Office',
      difficulty: 'Easy',
      time: '30 min',
      skill: 'Beginner',
      cost: '₹60',
      costUSD: '$0.80',
      sustainability: 88,
      emoji: '📦',
      color: '#4ADE80',
      description: 'Construct a sturdy multi-compartment desk organizer from folded and glued paper layers.',
      additionalMaterials: ['White glue', 'Scissors', 'Decorative tape'],
      steps: [
        { n: 1, title: 'Plan Compartments', desc: 'Sketch a layout with 3–5 sections based on your desk items.' },
        { n: 2, title: 'Roll Paper Tubes', desc: 'Roll sheets tightly and glue edges to form sturdy tubes.' },
        { n: 3, title: 'Build Base', desc: 'Glue a flat sheet as the base, cut to your desired footprint.' },
        { n: 4, title: 'Attach Dividers', desc: 'Stand tubes vertically and glue firmly to base.' },
        { n: 5, title: 'Decorate', desc: 'Wrap with washi tape or paint for a premium finish.' },
      ],
      safetyTips: ['Let glue dry fully before loading', 'Work on newspaper to protect surfaces'],
      environmentalImpact: 'Repurposes ~40 sheets. Zero plastic used.',
    },
  ],
  cardboard: [
    {
      id: 'cardboard-shelf',
      title: 'Wall Display Shelf',
      category: 'Home Decor',
      difficulty: 'Medium',
      time: '2 hrs',
      skill: 'Intermediate',
      cost: '₹150',
      costUSD: '$1.80',
      sustainability: 95,
      emoji: '🗄️',
      color: '#E4C441',
      description: 'Build a load-bearing honeycomb-reinforced wall shelf from corrugated cardboard. Holds up to 2 kg.',
      additionalMaterials: ['Strong adhesive', 'Box cutter', 'Paint', 'Wall hooks'],
      steps: [
        { n: 1, title: 'Cut Panels', desc: 'Cut 6 identical rectangular panels 30×20 cm from double-walled cardboard.' },
        { n: 2, title: 'Create Honeycomb Core', desc: 'Accordion-fold thin strips and glue between two panels for strength.' },
        { n: 3, title: 'Assemble Box', desc: 'Glue side panels to create an open-front box structure.' },
        { n: 4, title: 'Reinforce Edges', desc: 'Wrap all exposed edges with brown tape for a clean look.' },
        { n: 5, title: 'Paint & Seal', desc: 'Apply 2 coats of acrylic paint. Sand between coats.' },
        { n: 6, title: 'Mount', desc: 'Attach wall hooks to the back panel and hang securely.' },
      ],
      safetyTips: ['Use box cutter away from body', 'Ensure wall anchors are rated for weight', 'Paint in ventilated area'],
      environmentalImpact: 'Reuses large cardboard boxes. Prevents 500g CO₂ vs buying wood.',
    },
  ],
  fabric: [
    {
      id: 'fabric-tote',
      title: 'Eco Tote Bag',
      category: 'Fashion',
      difficulty: 'Medium',
      time: '1.5 hrs',
      skill: 'Intermediate',
      cost: '₹120',
      costUSD: '$1.50',
      sustainability: 97,
      emoji: '👜',
      color: '#4ADE80',
      description: 'Sew a durable, stylish tote bag from upcycled fabric scraps. Reinforced handles and inner pocket included.',
      additionalMaterials: ['Needle & thread', 'Scissors', 'Pins', 'Iron'],
      steps: [
        { n: 1, title: 'Cut Fabric', desc: 'Cut two 40×45 cm rectangles for body and two 60×6 cm strips for handles.' },
        { n: 2, title: 'Hem Edges', desc: 'Fold and press a 1 cm hem on the top edge of both body panels.' },
        { n: 3, title: 'Sew Body', desc: 'Pin body panels right-side together and sew three sides with 1.5 cm seam.' },
        { n: 4, title: 'Box Corners', desc: 'Pinch bottom corners, sew across 4 cm from tip to create a flat base.' },
        { n: 5, title: 'Attach Handles', desc: 'Fold handle strips lengthwise, sew, and attach to inside top hem.' },
        { n: 6, title: 'Add Pocket', desc: 'Cut a 20×15 cm piece, hem all edges, and sew onto inner panel.' },
      ],
      safetyTips: ['Keep fingers clear of needle', 'Iron on appropriate fabric setting'],
      environmentalImpact: 'Replaces 500 plastic bags over its lifetime.',
    },
  ],
  plastic: [
    {
      id: 'plastic-planter',
      title: 'Hanging Planter Set',
      category: 'Garden',
      difficulty: 'Easy',
      time: '40 min',
      skill: 'Beginner',
      cost: '₹50',
      costUSD: '$0.60',
      sustainability: 85,
      emoji: '🌿',
      color: '#4ADE80',
      description: 'Turn plastic bottles into a cascading vertical garden. Perfect for herbs and succulents.',
      additionalMaterials: ['Rope / twine', 'Drill or nail', 'Paint', 'Potting soil'],
      steps: [
        { n: 1, title: 'Clean Bottles', desc: 'Wash thoroughly and remove labels. Let dry completely.' },
        { n: 2, title: 'Cut Opening', desc: 'Cut a large oval opening on one side of each bottle using scissors.' },
        { n: 3, title: 'Drainage Holes', desc: 'Poke 4–6 small holes in the bottom for drainage.' },
        { n: 4, title: 'Paint', desc: 'Apply outdoor acrylic paint in 2 coats. Let cure 24 hours.' },
        { n: 5, title: 'Rig Hanging', desc: 'Thread twine through two holes at the top to create hangers.' },
        { n: 6, title: 'Plant', desc: 'Fill with soil and plant your herbs or succulents.' },
      ],
      safetyTips: ['Use safety scissors for cutting', 'Wear gloves when painting', 'Ensure secure wall anchor'],
      environmentalImpact: 'Keeps plastic out of ocean. Each planter replaces a bought pot.',
    },
  ],
  wood: [
    {
      id: 'wood-frame',
      title: 'Rustic Photo Frame',
      category: 'Home Decor',
      difficulty: 'Medium',
      time: '1 hr',
      skill: 'Intermediate',
      cost: '₹180',
      costUSD: '$2.20',
      sustainability: 80,
      emoji: '🖼️',
      color: '#E4C441',
      description: 'Craft a beautiful rustic photo frame from reclaimed wood pieces using minimal tools.',
      additionalMaterials: ['Sandpaper', 'Wood glue', 'Clamps', 'Varnish', 'Backing board'],
      steps: [
        { n: 1, title: 'Sand Wood', desc: 'Sand all pieces smooth — 80 grit then 220 grit for a fine finish.' },
        { n: 2, title: 'Cut Mitres', desc: 'Cut 45° mitre joints at each corner for clean connections.' },
        { n: 3, title: 'Glue Frame', desc: 'Apply wood glue to mitres and clamp for 30 minutes.' },
        { n: 4, title: 'Reinforce', desc: 'Add small corner brackets on the back for extra strength.' },
        { n: 5, title: 'Finish', desc: 'Apply walnut stain and two coats of matte varnish.' },
        { n: 6, title: 'Add Hardware', desc: 'Attach a sawtooth hanger and glass or acrylic panel.' },
      ],
      safetyTips: ['Wear eye protection when sanding', 'Use clamps — never hold with hands while cutting', 'Varnish in ventilated area'],
      environmentalImpact: 'Uses reclaimed wood. Saves one tree per 10 frames.',
    },
  ],
  default: [
    {
      id: 'mixed-sculpture',
      title: 'Mixed-Media Sculpture',
      category: 'Art',
      difficulty: 'Medium',
      time: '2 hrs',
      skill: 'Intermediate',
      cost: '₹100',
      costUSD: '$1.20',
      sustainability: 90,
      emoji: '🎨',
      color: '#E4C441',
      description: 'Create an expressive abstract sculpture combining your uploaded materials. A truly unique upcycled art piece.',
      additionalMaterials: ['Strong adhesive', 'Paint', 'Brushes', 'Wire'],
      steps: [
        { n: 1, title: 'Plan Composition', desc: 'Arrange your materials and sketch the intended form before gluing.' },
        { n: 2, title: 'Build Armature', desc: 'Create a wire skeleton as the internal support structure.' },
        { n: 3, title: 'Attach Materials', desc: 'Glue materials layer by layer from largest to smallest pieces.' },
        { n: 4, title: 'Fill Gaps', desc: 'Use paper maché or foam to fill structural gaps.' },
        { n: 5, title: 'Prime Surface', desc: 'Apply a white gesso coat to unify all materials visually.' },
        { n: 6, title: 'Paint & Seal', desc: 'Paint in your preferred palette and seal with clear varnish.' },
      ],
      safetyTips: ['Work in ventilated space', 'Wash hands after handling adhesives'],
      environmentalImpact: 'Repurposes 100% of uploaded materials. Zero new purchases required.',
    },
    {
      id: 'wall-art',
      title: 'Upcycled Wall Art',
      category: 'Home Decor',
      difficulty: 'Easy',
      time: '1 hr',
      skill: 'Beginner',
      cost: '₹70',
      costUSD: '$0.85',
      sustainability: 94,
      emoji: '🖼️',
      color: '#4ADE80',
      description: 'Create striking geometric wall art from your collected materials. No artistic experience needed.',
      additionalMaterials: ['Canvas board', 'Glue gun', 'Spray paint'],
      steps: [
        { n: 1, title: 'Plan Layout', desc: 'Arrange pieces on canvas board in geometric pattern before gluing.' },
        { n: 2, title: 'Glue Pieces', desc: 'Hot-glue each element firmly, working from center outward.' },
        { n: 3, title: 'Spray Paint', desc: 'Apply one unified color coat to create a cohesive look.' },
        { n: 4, title: 'Add Accents', desc: 'Highlight edges with gold or silver paint pen.' },
        { n: 5, title: 'Frame & Hang', desc: 'Mount on wall using picture hooks.' },
      ],
      safetyTips: ['Hot glue gun — avoid contact with nozzle', 'Spray paint outdoors'],
      environmentalImpact: 'Transforms waste into décor. No plastic packaging consumed.',
    },
  ],
}

/**
 * Detects material keywords from an image filename / tag list.
 * Replace with a real vision API call in production.
 */
function detectMaterialKey(images) {
  const names = images.map(img => (img.name || img.file?.name || '').toLowerCase()).join(' ')
  if (names.includes('paper') || names.includes('newspaper')) return 'paper'
  if (names.includes('card') || names.includes('box')) return 'cardboard'
  if (names.includes('fabric') || names.includes('cloth') || names.includes('textile')) return 'fabric'
  if (names.includes('plastic') || names.includes('bottle')) return 'plastic'
  if (names.includes('wood') || names.includes('stick')) return 'wood'
  return 'default'
}

/** Simulates AI processing steps with delays */
export const AI_STEPS = [
  { id: 'upload',       label: 'Images Uploaded',                    duration: 600  },
  { id: 'detect',       label: 'Detecting Materials',                 duration: 1200 },
  { id: 'recognize',    label: 'Recognizing Shapes & Textures',       duration: 1000 },
  { id: 'pattern',      label: 'Finding Similar Craft Patterns',      duration: 1400 },
  { id: 'generate',     label: 'Generating Design Options',           duration: 1600 },
  { id: 'render',       label: 'Rendering Craft Preview Image',       duration: 1200 },
  { id: 'instructions', label: 'Preparing Step-by-Step Instructions', duration: 1000 },
  { id: 'cost',         label: 'Optimizing Cost Estimation',          duration: 800  },
  { id: 'finalize',     label: 'Finalizing Recommendations',          duration: 700  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Canvas-based craft preview generator
// Draws a rich illustrated card for each craft type — no external images needed.
// Replace drawCraftScene() with a real AI image API call in production.
// ─────────────────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// Draws a specific scene per craft type
function drawCraftScene(ctx, craftId, W, H, accent) {
  const cx = W / 2, cy = H / 2
  const ac = hexToRgb(accent)
  const acStr = `rgb(${ac.r},${ac.g},${ac.b})`
  const acFaint = `rgba(${ac.r},${ac.g},${ac.b},0.15)`
  const acMid = `rgba(${ac.r},${ac.g},${ac.b},0.55)`

  ctx.strokeStyle = acStr
  ctx.fillStyle = acStr
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  if (craftId === 'paper-vase' || craftId.includes('vase')) {
    // Elegant vase silhouette
    ctx.save()
    ctx.strokeStyle = acStr
    ctx.lineWidth = 2.5
    // Vase body
    ctx.beginPath()
    ctx.moveTo(cx - 28, cy - 60)
    ctx.bezierCurveTo(cx - 50, cy - 30, cx - 55, cy + 10, cx - 38, cy + 60)
    ctx.lineTo(cx + 38, cy + 60)
    ctx.bezierCurveTo(cx + 55, cy + 10, cx + 50, cy - 30, cx + 28, cy - 60)
    ctx.closePath()
    ctx.fillStyle = acFaint
    ctx.fill()
    ctx.stroke()
    // Neck
    ctx.beginPath()
    ctx.moveTo(cx - 28, cy - 60)
    ctx.bezierCurveTo(cx - 20, cy - 80, cx + 20, cy - 80, cx + 28, cy - 60)
    ctx.stroke()
    // Rim
    ctx.beginPath()
    ctx.ellipse(cx, cy - 80, 22, 6, 0, 0, Math.PI * 2)
    ctx.stroke()
    // Geometric pattern lines
    ctx.lineWidth = 1
    ctx.strokeStyle = acMid
    for (let i = 0; i < 5; i++) {
      const y = cy - 40 + i * 18
      ctx.beginPath()
      ctx.moveTo(cx - 40 + i * 3, y)
      ctx.lineTo(cx + 40 - i * 3, y)
      ctx.stroke()
    }
    // Stems / flowers inside
    ctx.strokeStyle = acStr
    ctx.lineWidth = 1.5
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath()
      ctx.moveTo(cx + i * 14, cy - 80)
      ctx.lineTo(cx + i * 14, cy - 110 - Math.abs(i) * 10)
      ctx.stroke()
      // Flower dot
      ctx.beginPath()
      ctx.arc(cx + i * 14, cy - 112 - Math.abs(i) * 10, 4, 0, Math.PI * 2)
      ctx.fillStyle = acStr
      ctx.fill()
    }
    ctx.restore()

  } else if (craftId.includes('organizer') || craftId.includes('desk')) {
    // Desk organizer — multiple tubes
    const tubes = [
      { x: cx - 55, w: 28, h: 70, r: 5 },
      { x: cx - 20, w: 34, h: 90, r: 5 },
      { x: cx + 20, w: 28, h: 60, r: 5 },
      { x: cx + 54, w: 22, h: 80, r: 5 },
    ]
    ctx.save()
    tubes.forEach((t, i) => {
      const alpha = 0.1 + i * 0.06
      drawRoundedRect(ctx, t.x, cy + 30 - t.h, t.w, t.h, t.r)
      ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},${alpha})`
      ctx.fill()
      ctx.strokeStyle = acStr
      ctx.lineWidth = 1.8
      ctx.stroke()
      // Ellipse top
      ctx.beginPath()
      ctx.ellipse(t.x + t.w / 2, cy + 30 - t.h, t.w / 2, 5, 0, 0, Math.PI * 2)
      ctx.fillStyle = acMid
      ctx.fill()
      ctx.stroke()
    })
    // Base
    drawRoundedRect(ctx, cx - 70, cy + 28, 142, 12, 4)
    ctx.fillStyle = acMid
    ctx.fill()
    ctx.restore()

  } else if (craftId.includes('shelf')) {
    // Wall shelf — honeycomb effect
    ctx.save()
    const shelfW = 160, shelfH = 50, shelfD = 18
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    drawRoundedRect(ctx, cx - shelfW / 2 + 4, cy - shelfH / 2 + 4, shelfW, shelfH, 6)
    ctx.fill()
    // Main shelf
    drawRoundedRect(ctx, cx - shelfW / 2, cy - shelfH / 2, shelfW, shelfH, 6)
    ctx.fillStyle = acFaint
    ctx.fill()
    ctx.strokeStyle = acStr
    ctx.lineWidth = 2
    ctx.stroke()
    // Honeycomb cells
    ctx.lineWidth = 1
    ctx.strokeStyle = acMid
    for (let i = 0; i < 6; i++) {
      const hx = cx - 65 + i * 26, hy = cy
      ctx.beginPath()
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI / 3) * j - Math.PI / 6
        const px = hx + 11 * Math.cos(angle)
        const py = hy + 11 * Math.sin(angle)
        j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
    }
    // Objects on shelf
    const items = [{ s: 14, col: '#4ADE80' }, { s: 10, col: acStr }, { s: 18, col: acMid }]
    items.forEach((it, i) => {
      drawRoundedRect(ctx, cx - 55 + i * 40, cy - shelfH / 2 - it.s - 4, it.s * 1.2, it.s, 3)
      ctx.fillStyle = it.col
      ctx.globalAlpha = 0.7
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeStyle = it.col
      ctx.lineWidth = 1
      ctx.stroke()
    })
    ctx.restore()

  } else if (craftId.includes('tote') || craftId.includes('bag') || craftId.includes('fabric')) {
    // Tote bag
    ctx.save()
    ctx.lineWidth = 2.2
    // Bag body
    ctx.beginPath()
    ctx.moveTo(cx - 55, cy - 40)
    ctx.lineTo(cx - 60, cy + 65)
    ctx.quadraticCurveTo(cx - 60, cy + 75, cx - 50, cy + 75)
    ctx.lineTo(cx + 50, cy + 75)
    ctx.quadraticCurveTo(cx + 60, cy + 75, cx + 60, cy + 65)
    ctx.lineTo(cx + 55, cy - 40)
    ctx.closePath()
    ctx.fillStyle = acFaint
    ctx.fill()
    ctx.strokeStyle = acStr
    ctx.stroke()
    // Handles
    ctx.beginPath()
    ctx.arc(cx - 22, cy - 65, 20, Math.PI, 0)
    ctx.strokeStyle = acStr
    ctx.lineWidth = 4
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx + 22, cy - 65, 20, Math.PI, 0)
    ctx.stroke()
    // Seam lines
    ctx.lineWidth = 1
    ctx.strokeStyle = acMid
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(cx, cy - 40)
    ctx.lineTo(cx, cy + 75)
    ctx.stroke()
    ctx.setLineDash([])
    // Pocket
    drawRoundedRect(ctx, cx + 10, cy + 10, 38, 30, 4)
    ctx.strokeStyle = acStr
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.restore()

  } else if (craftId.includes('planter') || craftId.includes('plastic') || craftId.includes('bottle')) {
    // Hanging planter / bottles
    ctx.save()
    const bottleData = [
      { x: cx - 50, rop: -15 },
      { x: cx,      rop:  0  },
      { x: cx + 50, rop: -10 },
    ]
    bottleData.forEach((b) => {
      // Rope
      ctx.beginPath()
      ctx.moveTo(b.x, cy - 100)
      ctx.lineTo(b.x, cy - 58)
      ctx.strokeStyle = acMid
      ctx.lineWidth = 1.5
      ctx.stroke()
      // Bottle body
      ctx.beginPath()
      ctx.ellipse(b.x, cy - 20, 18, 38, 0, 0, Math.PI * 2)
      ctx.fillStyle = acFaint
      ctx.fill()
      ctx.strokeStyle = acStr
      ctx.lineWidth = 1.8
      ctx.stroke()
      // Neck
      drawRoundedRect(ctx, b.x - 7, cy - 62, 14, 10, 3)
      ctx.fillStyle = acMid
      ctx.fill()
      ctx.stroke()
      // Plant
      ctx.fillStyle = '#4ADE80'
      ctx.beginPath()
      ctx.ellipse(b.x - 6, cy - 52, 8, 12, -0.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(b.x + 6, cy - 50, 8, 14, 0.4, 0, Math.PI * 2)
      ctx.fill()
    })
    // Horizontal bar
    ctx.beginPath()
    ctx.moveTo(cx - 70, cy - 100)
    ctx.lineTo(cx + 70, cy - 100)
    ctx.strokeStyle = acStr
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()

  } else if (craftId.includes('frame') || craftId.includes('wood')) {
    // Photo frame
    ctx.save()
    const fw = 130, fh = 100, ft = 12
    // Outer frame
    drawRoundedRect(ctx, cx - fw / 2, cy - fh / 2, fw, fh, 8)
    ctx.fillStyle = acFaint
    ctx.fill()
    ctx.strokeStyle = acStr
    ctx.lineWidth = ft
    ctx.stroke()
    // Inner picture area
    drawRoundedRect(ctx, cx - fw / 2 + ft + 4, cy - fh / 2 + ft + 4, fw - (ft + 4) * 2, fh - (ft + 4) * 2, 4)
    ctx.fillStyle = 'rgba(7,30,38,0.6)'
    ctx.fill()
    // Wood grain lines
    ctx.lineWidth = 0.8
    ctx.strokeStyle = acMid
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(cx - fw / 2 + 4, cy - fh / 2 + 6 + i * 18)
      ctx.lineTo(cx - fw / 2 + 10, cy - fh / 2 + 6 + i * 18)
      ctx.stroke()
    }
    // Simple landscape inside
    ctx.fillStyle = 'rgba(74,222,128,0.3)'
    ctx.beginPath()
    ctx.ellipse(cx, cy + 14, 28, 14, 0, 0, Math.PI)
    ctx.fill()
    ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},0.4)`
    ctx.beginPath()
    ctx.moveTo(cx - 12, cy + 10)
    ctx.lineTo(cx, cy - 18)
    ctx.lineTo(cx + 12, cy + 10)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

  } else if (craftId.includes('sculpture') || craftId.includes('mixed')) {
    // Abstract mixed-media sculpture
    ctx.save()
    const shapes = [
      { type: 'circle', x: cx - 20, y: cy - 20, r: 30 },
      { type: 'rect', x: cx + 10, y: cy - 50, w: 40, h: 50 },
      { type: 'triangle', x: cx - 50, y: cy + 20 },
    ]
    shapes.forEach((s, i) => {
      ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},${0.08 + i * 0.06})`
      ctx.strokeStyle = acStr
      ctx.lineWidth = 1.8
      if (s.type === 'circle') {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill(); ctx.stroke()
      } else if (s.type === 'rect') {
        drawRoundedRect(ctx, s.x, s.y, s.w, s.h, 5)
        ctx.fill(); ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.moveTo(s.x, s.y + 40)
        ctx.lineTo(s.x + 40, s.y + 40)
        ctx.lineTo(s.x + 20, s.y)
        ctx.closePath()
        ctx.fill(); ctx.stroke()
      }
    })
    // Centre accent dot
    ctx.beginPath()
    ctx.arc(cx, cy, 10, 0, Math.PI * 2)
    ctx.fillStyle = acStr
    ctx.fill()
    ctx.restore()

  } else {
    // Generic wall art / default
    ctx.save()
    const gridSize = 5
    const cellW = 28, cellH = 28
    const startX = cx - (gridSize * cellW) / 2
    const startY = cy - (gridSize * cellH) / 2
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const filled = (row + col) % 2 === 0
        drawRoundedRect(ctx, startX + col * cellW + 2, startY + row * cellH + 2, cellW - 4, cellH - 4, 4)
        ctx.fillStyle = filled ? acFaint : 'rgba(255,255,255,0.02)'
        ctx.fill()
        ctx.strokeStyle = filled ? acStr : 'rgba(255,255,255,0.05)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
    ctx.restore()
  }
}

/**
 * Generates a premium canvas preview image for a given craft.
 * Returns a data URL (PNG). No external assets required.
 * In production, replace this with a call to DALL-E / Stable Diffusion.
 */
export function generateCraftPreview(craft, width = 600, height = 380) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const accent = craft.color || '#E4C441'
  const ac = hexToRgb(accent)
  const isGreen = accent === '#4ADE80'

  // ── Background ──────────────────────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, width, height)
  bgGrad.addColorStop(0, '#071E26')
  bgGrad.addColorStop(0.6, '#0d2f3c')
  bgGrad.addColorStop(1, '#071E26')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, width, height)

  // Subtle radial glow
  const glow = ctx.createRadialGradient(width * 0.65, height * 0.35, 0, width * 0.65, height * 0.35, width * 0.55)
  glow.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},0.08)`)
  glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)

  // Grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'
  ctx.lineWidth = 0.5
  const gridSpacing = 32
  for (let x = 0; x < width; x += gridSpacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
  }
  for (let y = 0; y < height; y += gridSpacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
  }

  // ── Corner brackets (decorative) ────────────────────
  const bLen = 20, bOff = 14
  ctx.strokeStyle = `rgba(${ac.r},${ac.g},${ac.b},0.4)`
  ctx.lineWidth = 1.5
  ;[[bOff, bOff, 1, 1], [width - bOff, bOff, -1, 1],
    [bOff, height - bOff, 1, -1], [width - bOff, height - bOff, -1, -1]
  ].forEach(([x, y, dx, dy]) => {
    ctx.beginPath(); ctx.moveTo(x + dx * bLen, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * bLen); ctx.stroke()
  })

  // ── Material tag pills (top-left) ───────────────────
  const pillY = 22
  const pills = [craft.difficulty, craft.time, craft.category]
  let pillX = 20
  pills.forEach(text => {
    const pad = 10, pillH = 22, r2 = 11
    const tw = ctx.measureText(text).width + pad * 2
    drawRoundedRect(ctx, pillX, pillY, tw, pillH, r2)
    ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},0.12)`
    ctx.fill()
    ctx.strokeStyle = `rgba(${ac.r},${ac.g},${ac.b},0.25)`
    ctx.lineWidth = 0.8
    ctx.stroke()
    ctx.fillStyle = accent
    ctx.font = '600 10px Inter, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(text, pillX + pad, pillY + 15)
    pillX += tw + 8
  })

  // ── Match score badge (top-right) ───────────────────
  const badge = `${craft.matchScore || 97}% match`
  ctx.font = '700 11px "JetBrains Mono", monospace'
  const bw = ctx.measureText(badge).width + 20
  drawRoundedRect(ctx, width - bw - 16, 16, bw, 24, 12)
  ctx.fillStyle = 'rgba(74,222,128,0.12)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(74,222,128,0.3)'
  ctx.lineWidth = 0.8
  ctx.stroke()
  ctx.fillStyle = '#4ADE80'
  ctx.textAlign = 'left'
  ctx.fillText(badge, width - bw - 6, 31)

  // ── Central craft illustration ───────────────────────
  drawCraftScene(ctx, craft.id, width, height, accent)

  // ── Uploaded materials strip (if images provided) ──
  // (handled separately in the React component via overlay)

  // ── Bottom info bar ──────────────────────────────────
  const barH = 64
  const barGrad = ctx.createLinearGradient(0, height - barH, 0, height)
  barGrad.addColorStop(0, 'rgba(7,30,38,0)')
  barGrad.addColorStop(0.4, 'rgba(7,30,38,0.92)')
  barGrad.addColorStop(1, 'rgba(7,30,38,1)')
  ctx.fillStyle = barGrad
  ctx.fillRect(0, height - barH, width, barH)

  // Craft title
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '700 18px "JetBrains Mono", monospace'
  ctx.textAlign = 'left'
  ctx.fillText(craft.title, 20, height - 32)

  // Cost + time on right
  ctx.fillStyle = accent
  ctx.font = '600 13px "JetBrains Mono", monospace'
  ctx.textAlign = 'right'
  ctx.fillText(`${craft.cost}  ·  ${craft.time}`, width - 20, height - 32)

  // Description line
  ctx.fillStyle = '#8FA7AD'
  ctx.font = '400 11px Inter, sans-serif'
  ctx.textAlign = 'left'
  const desc = craft.description ? craft.description.slice(0, 72) + (craft.description.length > 72 ? '...' : '') : ''
  ctx.fillText(desc, 20, height - 14)

  // ── AI Generated watermark ───────────────────────────
  ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},0.35)`
  ctx.font = '500 10px "JetBrains Mono", monospace'
  ctx.textAlign = 'right'
  ctx.fillText('CraftFlow AI  ✦  Generated Preview', width - 14, height - barH + 14)

  return canvas.toDataURL('image/png')
}

/** Main mock AI function — returns craft suggestions */
export async function analyzeMaterials(images, onStep) {
  const key = detectMaterialKey(images)
  const primaryCrafts = CRAFT_DATABASE[key] || CRAFT_DATABASE.default
  const extraCrafts = CRAFT_DATABASE.default.filter(c => !primaryCrafts.find(p => p.id === c.id))

  // Simulate step-by-step progress
  for (let i = 0; i < AI_STEPS.length; i++) {
    await new Promise(r => setTimeout(r, AI_STEPS[i].duration))
    if (onStep) onStep(i)
  }

  // Return merged suggestions with generated preview images
  const combined = [...primaryCrafts, ...extraCrafts].slice(0, 5)
  return combined.map((craft, i) => {
    const enriched = {
      ...craft,
      variationIndex: i + 1,
      matchScore: Math.max(72, 99 - i * 5),
      generatedAt: new Date().toISOString(),
    }
    // Generate canvas preview — runs synchronously in browser
    try {
      enriched.previewImage = generateCraftPreview(enriched)
    } catch (e) {
      enriched.previewImage = null
    }
    return enriched
  })
}
