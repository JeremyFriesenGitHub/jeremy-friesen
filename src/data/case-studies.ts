import type { CaseStudy } from "./projects";

/**
 * The long-form story behind each flagship project, keyed by the project's
 * slug (projects.ts attaches them). Everything here is drawn from the
 * project's own repository and write-up; numbers are quoted as reported
 * there, not re-measured.
 */
export const caseStudyBySlug: Record<string, CaseStudy> = {
  trace: {
    summary:
      "Unsupervised anomaly detection that surfaced a hidden multi-stage attack in 180,800 unlabelled Apache log lines, then handed analysts an investigation console.",
    problem: [
      "Hack the North 2026's CSE challenge, Log & Order, supplied 180,800 Apache access-log lines from August 2025 to March 2026, with seven useful fields and no labels. Somewhere in March sat one real multi-stage attack: a credential brute force from an unfamiliar IP, a CSRF probe, a privilege escalation and an account takeover that exfiltrated data, 22 lines in all.",
      "The background traffic was seeded with decoys (off-hours activity, weekend traffic, 403 probes, isolated failed logins), so simple rules drown in false positives. The brief was tooling a security analyst could actually use to find the incident and document it.",
    ],
    approach: [
      "Turned every log line into 15 causal, behavioural features rather than raw fields: how surprising this IP is for this user, how unusual the method and path template are, per-user denial rates on sensitive resources, recent 401s, off-hours flags. Statistics are fit on the training months only, and each row sees only the rows before it.",
      "Benchmarked a zoo of detectors (KMeans, Gaussian mixtures, Isolation Forest, One-Class SVM, LOF, HBOS, ECOD, COPOD, PCA, autoencoders, DeepSVDD and a no-ML weighted-surprisal rule) against a PyTorch autoencoder ensemble: seven seeded models with error-weighted reconstruction scores, rank-averaged.",
      "Chose hyperparameters and the alert threshold without touching the test month. Synthetic attacks mimicking the tactics were injected into the February validation window across five seeds; the 22 hand-labelled March rows were scored exactly once, with 1,000× bootstrap confidence intervals.",
      "Added a hybrid triage step: the Gaussian mixture's top-60 shortlist goes to GPT-5 together with each user's learned permission profile, which promotes confirmed lines and demotes cleared ones. Blind LLM baselines saw raw log windows with no profiles, for a fair comparison.",
      "Shipped an analyst dashboard, plain HTML, CSS and JavaScript on Vercel in front of a Flask API on Railway: upload logs, pick a detector, get candidate investigations grouped in time with five minutes of context either side per IP and account, explanation tags on every line, analyst notes, and an evidence report export with an executive assessment and one section per episode.",
    ],
    result: [
      "The autoencoder ensemble reached 0.918 PR-AUC and the Gaussian mixture 0.909, each surfacing 20 of the 22 attack lines in its top 50; the two are statistically tied, and the mixture trains in under a second on a CPU. Moving that same model from raw fields to the behavioural features lifted it from 0.61 to 0.91, which was the project's main lesson: the representation mattered more than the algorithm.",
      "Blind GPT-5 and Claude baselines found most of the attack but flagged every authorised read of a confidential file, 225 and 614 false positives. Detector-guided triage removed every false positive at $0.08 a run. Trace took first place in the CSE challenge at Hack the North 2026.",
    ],
  },

  maplevault: {
    summary:
      "Signed, hash-linked supplier attestations for Canadian defence procurement, with a verifier that computes Canadian content and catches forgery, tampering and replay.",
    problem: [
      "Canada's procurement rules turn on whether a product is “Product of Canada” or “Made in Canada”, but across a multi-tier supply chain those claims rest on supplier self-reporting that nobody can verify or reconstruct afterwards.",
      "The Ottawa Defence Hackathon's cryptographic-provenance challenge asked for a system in which every supplier contribution is a signed attestation, attestations hash-link across tiers into a tamper-evident chain, and an independent verifier computes the Canadian-content percentage while detecting forgery, tampering, replay and statistical anomalies. The worked example was a drone.",
    ],
    approach: [
      "Each supply-chain step is a JSON attestation (supplier, action, country, quantities, costs and the hashes of its parents) signed with Ed25519 over a byte-exact canonical serialization. Attestations form a directed acyclic graph that can arrive in any order and is re-indexed from its parent links.",
      "A stateless FastAPI service exposes one endpoint. The whole chain travels in the request, so there is no database: the service rebuilds the graph, sums costs by country, walks back from the product to the last substantial transformation, assigns the designation (98% Canadian content with a Canadian last step for Product of Canada, 51% for Made in Canada) and then runs every detector.",
      "Sixteen deterministic rules: invalid or unknown signatures, parent-hash mismatches, dangling parents, cycles, unit and mass-balance violations across diamond-shaped graphs, timestamp inversions, implausible labour rates, replay within and across chains, and anchor-registry mismatches. Four statistical detectors sit beside them, with baselines distilled offline from the 1,000-chain training corpus.",
      "Precision over recall, on purpose. The challenge scores an F1, so the statistical thresholds sit a margin above the genuine maximum (z-scores of 3.5 and 3.6), and the two families that give up recall are documented as a deliberate trade rather than tuned until they flag honest suppliers.",
      "A React 19 and Vite front end: a landing page plus Purchaser, Supplier and Playground routes. Purchasers scan a QR code (it carries only a link with the product id, never chain data) and get the verdict, the Canadian-content percentage, a cost-by-country table and an interactive graph of the chain. Suppliers sign attestations in the browser with the same canonical JSON and Ed25519, checked against the same golden vectors as the backend. The playground lets you edit one signed field and watch the hash links break downstream.",
    ],
    result: [
      "Against the labelled 1,000-chain corpus the verifier scored 98.3%, with 100% on every hard-rule attack family and zero false positives across the 705 clean chains; the gap is in two statistical families where the thresholds favour honest suppliers. Measured throughput was about 1,370 requests a second on eight workers of a 12-core host, roughly 4 ms a chain.",
      "Fifty backend tests, five golden-vector tests and 114 front-end tests run on every change, and a corpus guard fails the build if clean-chain false positives ever rise above zero.",
    ],
    team: ["Jowi Aoun"],
  },

  buildo: {
    summary:
      "Describe a gadget in a sentence and get a shoppable parts list from real listings, a picture of the build, numbered assembly steps with images, and starter firmware.",
    problem: [
      "Makers who can describe a gadget in plain English still have to work out which real, compatible parts to buy, how to wire them and what starter code to write before anything happens. Buildo closes that gap from one prompt: type a sentence and get a bill of materials drawn from real supplier listings, a product shot of the assembled device, physical assembly steps with a generated image for each, and a microcontroller skeleton to flash. Built over a weekend at ConUHacks X.",
    ],
    approach: [
      "Grounding is a two-stage lookup. Gemini 2.5 Flash, in JSON mode and boxed into fourteen fixed part categories, emits only search keywords such as “ESP32-C3 super mini WiFi Bluetooth”; a deterministic scorer then picks one real listing per keyword from a 7,769-entry catalogue scraped from AliExpress, so every part in the cart has a real price, rating, sales count, photo and purchase link.",
      "Assembly steps and firmware come from Claude 3.5 Sonnet through Snowflake Cortex. The steps prompt forces “gather the parts” first and then only physical, imperative actions with pin assignments; the code prompt returns an Arduino-style setup and loop skeleton, or says no code is required.",
      "A photorealistic shot of the assembled device comes from Gemini's image model. A second service renders one image per assembly step, each conditioned on the previous step's image plus photos of the actual listed parts and told to keep the same top-down framing, so the sequence walks from loose parts to a wired build.",
      "The build page renders the dashboard as soon as the parts, code and steps arrive, then streams the step images in one at a time, so a slow image model never blocks the parts list.",
      "A Next.js 16 front end in NES.css pixel style with four tabs: Visualize, Shop Parts (a cart with quantities, buy links and a tax estimate), Code (copy button and syntax highlighting) and Assemble (safety warnings, step cards and a download).",
    ],
    result: [
      "A working pipeline from one sentence to parts, picture, steps, images and code, built in 126 commits over the hackathon weekend by four of us. Buildo won MLH's Best Use of Gemini API at ConUHacks X.",
    ],
    role: "I set up the Next.js app and built the front end's first cut: the pixel-art boilerplate, the landing page, the loading screens, the tabbed dashboard skeleton that the others filled in, the build route and the mobile fixes. I also did the deployment work: the main Flask API behind Gunicorn on Railway, the image service bound to its port, and CORS opened on both for the Vercel front end.",
    team: ["Chantal Zhang", "Torrey Liu", "Mikhai Wilson"],
  },

  plante: {
    summary:
      "A pixel-art smart greenhouse: a Raspberry Pi watches the plants and works the lid, and the app turns keeping them alive into a game.",
    problem: [
      "People who want to grow their own food often do not have time to watch over it. Plante pairs a physical mini greenhouse, built on a Raspberry Pi 5 and an Arduino, with a pixel-art web app so the boring parts of plant care (lid control, sensor checks, alerts) happen on their own and the rest becomes a game with XP, achievements, a museum of trophies and a leaderboard. Built in 36 hours at uOttaHack 8.",
    ],
    approach: [
      "Hardware: the Pi reads a DHT11 for temperature and humidity, a BH1750 light sensor over I2C, a soil-moisture probe through an ADS1256 analog-to-digital HAT over SPI with a custom driver, and a Camera Module 3. An Arduino drives two servos that open and close the greenhouse lid on serial commands.",
      "A FastAPI service on the Pi is the only process that touches the GPIO pins. It caches readings, exposes sensor, camera, lid and config endpoints, runs under systemd and can require an API key. An earlier design that read the sensors straight from the web backend deadlocked, which is why the hardware got its own service.",
      "An automation loop polls that service and compares readings against thresholds that can be edited live (15 to 28 °C, 30 to 70% humidity, 20% soil moisture, 200 lux). Temperature and humidity out of range open or close the lid over the Arduino's serial link; soil moisture and light only raise a warning. The lid endpoint itself moves the servos in five-degree steps, so the lid never slams.",
      "The app is Next.js 16, React 19 and TypeScript on Vercel, reaching the Pi through a Cloudflare Tunnel: Google sign-in, sensor snapshots in MongoDB, and each farm's status computed as healthy, warning (within 10% of a limit) or critical.",
      "At the hackathon the AI layer was a chat assistant on Gemini whose system prompt carried each farm's live readings, spoken replies through ElevenLabs, a Gemini-written weekly report and SMS alerts through Twilio. Those services were retired afterwards and the app was rebuilt as a zero-config demo with simulated sensor drift.",
      "The pixel-art UI uses NES.css, the PICO-8 palette and the Press Start 2P font. The museum is a 16-by-10 tile room where your avatar walks between achievement pedestals, locked ones showing a padlock; the farm mini-game shows every plot with its live status, and you can visit friends' farms.",
    ],
    result: [
      "Plante won the Best Design prize at uOttaHack 8, a hackathon with more than 400 participants. The planned water pump could not draw enough power from the hackathon kit, so “Water now” became a notification instead: a crash course in scoping an MVP. The demo lives on, with a hardware tour on YouTube.",
    ],
    team: ["Jowi Aoun"],
  },

  cutunnel: {
    summary:
      "An interactive map of Carleton's underground tunnel network that finds the quickest route between any two buildings.",
    problem: [
      "Carleton's buildings connect through a tunnel system that first-years find hard to navigate, and in an Ottawa winter it is the way to get to class on time. cuTunnel lets students and faculty tap a start and a destination and see the shortest route underground, with an estimated walking time.",
    ],
    approach: [
      "The tunnel network is a hand-built weighted graph: 37 building and landmark nodes placed at fixed coordinates so the layout matches the campus map, and 46 edges whose weights are walking times gathered by pacing the tunnels.",
      "Cytoscape.js draws the graph in a single-page app and its built-in Dijkstra implementation computes the route. The path is highlighted and the summed weight shown as minutes and seconds.",
      "Buildings with several entrances or levels are modelled as more than one node, such as the two University Centre levels joined by their own edge, so routes reflect the stairs people actually take.",
      "Tap the first building to set the start and the second to route; a third tap, or the empty canvas, clears it. Most tunnel segments are colour-coded by section so the map stays readable.",
    ],
    result: [
      "The hardest part was the data, not the algorithm: measuring believable travel times for 46 segments and turning them into weights. cuTunnel won the Wolfram Award (top five) and People's Choice at cuHacking 6.",
    ],
  },

  agent2: {
    summary:
      "Your real estate agent's agent: text a number, take a short call with an AI voice agent, and get a matched listing back by SMS.",
    problem: [
      "Finding a home means downloading apps, making accounts, toggling filters and scrolling, or hiring a commission-paid agent whose incentives are not yours. Agent² replaces that with a phone. You text a number, get a call back from an AI voice agent named Maya, describe what you want in plain speech, and receive a matched Zillow listing by SMS. Built at GenAI Genesis 2026.",
    ],
    approach: [
      "An SMS state machine in a FastAPI webhook drives the whole flow: a new number is asked to confirm, a YES starts a GPU notebook for the voice model and places an outbound Twilio call, the call's transcript becomes a search, and each listing texted back asks for a 1 (keep it) or a 2 (what didn't you like?). Sessions live in DynamoDB, and RESET and STOP do what they say.",
      "The call is a full-duplex voice bridge. Twilio streams 8 kHz mulaw over a WebSocket; the bridge decodes it, upsamples to 24 kHz with a resampler that keeps its state across chunks, Opus-encodes it and streams it to a PersonaPlex 7B speech-to-speech model, with the reverse chain running in a second asyncio task.",
      "Both sides of the call are mixed into one recording, transcribed with faster-whisper and uploaded to S3. A Railtracks agent then turns the transcript into a JSON search: location, buy or rent, price, bedrooms, bathrooms, property type, required and nice-to-have features. The prompt trusts the caller's own words over Maya's recap, since the recap can carry speech-recognition errors, and estimates a budget from stated income when none is given.",
      "Search scrapes Zillow broadly through ScraperAPI, parses the embedded JSON and each listing's detail page to confirm features such as pet policy, parking and nearby schools, then scores locally: within budget earns points, each confirmed required feature earns more, a missing one costs, and any hard violation moves the listing from matches to nearest.",
      "The top five scored listings and every rejection reason so far go to the language model, which picks one. A 2 stores the reason and advances to the next page; a 1 schedules a one-hour cooldown before the next suggestion, so the search refines without another call.",
    ],
    result: [
      "A working pipeline from a text message to a phone call to a listing, with a refinement loop that closes over the caller's rejection reasons. After the hackathon the team wrote a production plan moving the voice model to SageMaker and the API to Lambda, DynamoDB and S3, at an estimated $1.11 a day plus $0.10 a call.",
    ],
    role: "I set up the static landing page and its first theme, which teammates then redesigned, and wrote the original Twilio SMS webhook and sender that the later state machine replaced. On the data side I swapped the Playwright-based Zillow fetcher for a ScraperAPI fetch after trying rotating proxies, added the Railtracks quick-start notebook, and fixed the deployment dependencies.",
    team: ["Chantal Zhang", "Juniel Djossou", "Mikhai Wilson"],
  },

  "land-cover-segmentation": {
    summary:
      "Wildfire-risk screening for British Columbia homes: segmentation models find buildings and vegetation in aerial imagery, and every parcel gets a FireSmart score.",
    problem: [
      "FireSmart Canada rates a home's wildfire exposure by how much vegetation sits in the zones around it: the first 1.5 m, out to 10 m, 10 to 30 m, and beyond. Scoring whole communities that way needs building footprints and vegetation masks pulled from aerial imagery, stitched back onto map coordinates and clipped to property parcels so each parcel gets its own number. Built as a course project, for wildland-urban-interface towns in BC.",
    ],
    approach: [
      "Training data came from LandCover.ai (Poland, five classes) and the INRIA aerial labelling set, tiled to 512 px and re-split by source image so tiles from one photo never leak between train, validation and test.",
      "A time-budgeted search over segmentation_models_pytorch ran 15 configurations (U-Net, DeepLabV3+, FPN, MAnet, LinkNet and PSPNet with ResNet, EfficientNet and MobileNet encoders at three learning rates) for three epochs each on a subset, ranked them by validation mIoU, then trained the winner in full with AdamW, weighted cross-entropy, mixed precision, a cosine schedule and early stopping. FPN with an EfficientNet-B3 encoder won.",
      "The multiclass winner was weak on buildings (0.13 IoU against 0.58 for woodland), so the project moved to separate binary detectors for buildings and woodland with BCE-plus-Dice loss and class weighting, and later a ConvNeXt-XLarge encoder with a light MLP decoder and focal loss.",
      "Inference runs both detectors over tiles and cleans the masks morphologically: erode, drop blobs with the wrong aspect ratio or solidity, dilate, intersect with the raw mask, close, and discard anything under a minimum area.",
      "Risk scoring finds each building as a connected component, takes a Euclidean distance transform from its edge, forms the four FireSmart rings and sums vegetation density per ring with the inner rings weighted highest. Parcel scoring reads the GeoTIFF's georeferencing tags directly and clips the masks to ParcelMap BC polygons, so results come out per property.",
      "For West Kelowna, Logan Lake and Silver Star, where only 1 m government orthophotos exist, the same scoring ran on Microsoft Building Footprints and Meta's canopy-height maps, giving a low-resolution comparison against the 6 cm drone imagery and CNN masks used for Cumberland.",
    ],
    result: [
      "The committed Cumberland run scored 2,397 buildings across 1,147 tiles at 6 cm resolution: nine high risk, 39 moderate and the rest low, with a mean distance to the nearest vegetation of 5.7 m. The ConvNeXt woodland model reached 0.90 IoU on its test split; the project's data sheet reports 0.74 IoU for the earlier FPN building model and 0.76 for vegetation.",
    ],
  },

  "network-threat-explorer": {
    summary:
      "Suricata events from a packet capture become statistics, machine-learning-flagged anomalies and a written security assessment.",
    problem: [
      "The Communications Security Establishment's Network Traffic Exploration challenge at Hack the North 2025 handed over the MACCDC 2012 packet captures (17 compressed PCAPs and a 1.1 GB Suricata event log) and asked for tooling that helps an analyst map the network, find the most aggressive attacker and the most attacked defender, cut false positives and summarise what matters. Reading alerts by hand does not scale to that.",
    ],
    approach: [
      "The provided pipeline runs Suricata over every capture in a container and produces EVE JSON. Network Threat Explorer takes that JSON as its input: a Flask app loads it into an in-memory DuckDB with the JSON extension, flattens the nested alert, flow, HTTP and payload fields into columns, and hands pandas the frames for aggregation.",
      "The analytics report covers event types and protocols, the time range, unique sources and destinations, alert severities, top signatures and source IPs, destination ports outside the usual set, the hourly distribution and the top talkers by bytes.",
      "Anomaly detection layers several methods: an Isolation Forest on standardised features (hour, destination port, bytes each way, payload size, alert flag), z-score and interquartile-range outliers, DBSCAN noise points, a rolling-window check on hourly volumes, and plain rules for oversized payloads, scanner user agents such as nmap and sqlmap, ephemeral ports and the loudest 5% of sources.",
      "Cohere's command model writes the assessment. It never sees raw events, only a digest of the top-five lists, and is asked for a threat assessment, risk and behaviour analysis, recommendations and priority actions, rendered as HTML inside the report.",
      "The front end is plain JavaScript with Chart.js: five stat cards, a 24-hour event-type chart, the AI report and a download button, plus a link into a bundled Malcolm instance (Arkime, Zeek and OpenSearch) for packet-level digging.",
    ],
    result: [
      "The tool took the CSE prize for Network Traffic Exploration at Hack the North 2025.",
    ],
  },
};
