## Phase 3: Record

Only after discovery and rehearsal pass should you create the recording.

### Recording Principles

#### 1. Storytelling Flow

Plan the video as a story. Follow user-specified order, or use this default:

- **Entry**: Login or navigate to the starting point
- **Context**: Pan the surroundings so viewers orient themselves
- **Action**: Perform the main workflow steps
- **Variation**: Show a secondary feature such as settings, theme, or localization
- **Result**: Show the outcome, confirmation, or new state

#### 2. Pacing

- After login: `4s`
- After navigation: `3s`
- After clicking a button: `2s`
- Between major steps: `1.5-2s`
- After the final action: `3s`
- Typing delay: `25-40ms` per character

#### 3. Cursor Overlay

Inject an SVG arrow cursor that follows mouse movements:

```javascript
async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = `
      position: fixed; z-index: 999999; pointer-events: none;
      width: 24px; height: 24px;
      transition: left 0.1s, top 0.1s;
      filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));
    `;
    cursor.style.left = '0px';
    cursor.style.top = '0px';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  });
}
```

Call `injectCursor(page)` after every page navigation because the overlay is destroyed on navigate.

#### 4. Mouse Movement

Never teleport the cursor. Move to the target before clicking:

```javascript
async function moveAndClick(page, locator, label, opts = {}) {
  const { postClickDelay = 800, ...clickOpts } = opts;
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.error(`WARNING: moveAndClick skipped - "${label}" not visible`);
    return false;
  }
  try {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const box = await el.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await page.waitForTimeout(400);
    }
    await el.click(clickOpts);
  } catch (e) {
    console.error(`WARNING: moveAndClick failed on "${label}": ${e.message}`);
    return false;
  }
  await page.waitForTimeout(postClickDelay);
  return true;
}
```

Every call should include a descriptive `label` for debugging.

#### 5. Typing

Type visibly, not instant-fill:

```javascript
async function typeSlowly(page, locator, text, label, charDelay = 35) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.error(`WARNING: typeSlowly skipped - "${label}" not visible`);
    return false;
  }
  await moveAndClick(page, el, label);
  await el.fill('');
  await el.pressSequentially(text, { delay: charDelay });
  await page.waitForTimeout(500);
  return true;
}
```

#### 6. Scrolling

Use smooth scroll instead of jumps:

```javascript
await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'smooth' }));
await page.waitForTimeout(1500);
```

#### 7. Dashboard Panning

When showing a dashboard or overview page, move the cursor across key elements:

```javascript
async function panElements(page, selector, maxCount = 6) {
  const elements = await page.locator(selector).all();
  for (let i = 0; i < Math.min(elements.length, maxCount); i++) {
    try {
      const box = await elements[i].boundingBox();
      if (box && box.y < 700) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
        await page.waitForTimeout(600);
      }
    } catch (e) {
      console.warn(`WARNING: panElements skipped element ${i} (selector: "${selector}"): ${e.message}`);
    }
  }
}
```

#### 8. Subtitles

Inject a subtitle bar at the bottom of the viewport:

```javascript
async function injectSubtitleBar(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-subtitle')) return;
    const bar = document.createElement('div');
    bar.id = 'demo-subtitle';
    bar.style.cssText = `
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 999998;
      text-align: center; padding: 12px 24px;
      background: rgba(0, 0, 0, 0.75);
      color: white; font-family: -apple-system, "Segoe UI", sans-serif;
      font-size: 16px; font-weight: 500; letter-spacing: 0.3px;
      transition: opacity 0.3s;
      pointer-events: none;
    `;
    bar.textContent = '';
    bar.style.opacity = '0';
    document.body.appendChild(bar);
  });
}

async function showSubtitle(page, text) {
  await page.evaluate((t) => {
    const bar = document.getElementById('demo-subtitle');
    if (!bar) return;
    if (t) {
      bar.textContent = t;
      bar.style.opacity = '1';
    } else {
      bar.style.opacity = '0';
    }
  }, text);
  if (text) await page.waitForTimeout(800);
}
```

Call `injectSubtitleBar(page)` alongside `injectCursor(page)` after every navigation.

Usage pattern:

```javascript
await showSubtitle(page, 'Step 1 - Logging in');
await showSubtitle(page, 'Step 2 - Dashboard overview');
await showSubtitle(page, '');
```

Guidelines:

- Keep subtitle text short, ideally under 60 characters.
- Use `Step N - Action` format for consistency.
- Clear the subtitle during long pauses where the UI can speak for itself.


## Checklist Before Recording

- [ ] Discovery phase completed
- [ ] Rehearsal passes with all selectors OK
- [ ] Headless mode enabled
- [ ] Resolution set to `1280x720`
- [ ] Cursor and subtitle overlays re-injected after every navigation
- [ ] `showSubtitle(page, 'Step N - ...')` used at major transitions
- [ ] `moveAndClick` used for all clicks with descriptive labels
- [ ] `typeSlowly` used for visible input
- [ ] No silent catches; helpers log warnings
- [ ] Smooth scrolling used for content reveal
- [ ] Key pauses are visible to a human viewer
- [ ] Flow matches the requested story order
- [ ] Script reflects the actual UI discovered in phase 1

## Common Pitfalls

1. Cursor disappears after navigation - re-inject it.
2. Video is too fast - add pauses.
3. Cursor is a dot instead of an arrow - use the SVG overlay.
4. Cursor teleports - move before clicking.
5. Select dropdowns look wrong - show the move, then pick the option.
6. Modals feel abrupt - add a read pause before confirming.
7. Video file path is random - copy it to a stable output name.
8. Selector failures are swallowed - never use silent catch blocks.
9. Field types were assumed - discover them first.
10. Features were assumed - inspect the actual UI before scripting.
11. Placeholder select values look real - watch for `"0"` and `"Select..."`.
12. Popups create separate videos - capture popup pages explicitly and merge later if needed.
