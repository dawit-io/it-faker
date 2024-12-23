import{s as a,b as i,a6 as e,a as n}from"./chunks/framework.DSXbG5Pd.js";const c=JSON.parse('{"title":"People","description":"","frontmatter":{},"headers":[],"relativePath":"company.md","filePath":"company.md"}'),t={name:"company.md"};function l(r,s,p,o,h,d){return n(),i("div",null,s[0]||(s[0]=[e(`<h1 id="people" tabindex="-1">People <a class="header-anchor" href="#people" aria-label="Permalink to &quot;People&quot;">​</a></h1><p>Generate consistent Italian people data including names, surnames, and fiscal codes based on real demographic distributions.</p><h2 id="names" tabindex="-1">Names <a class="header-anchor" href="#names" aria-label="Permalink to &quot;Names&quot;">​</a></h2><p>Generate realistic Italian first names based on national frequency distribution data from ISTAT.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { faker } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@fakerjs/it&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate a random first name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &quot;Marco&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate a male first name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;male&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &quot;Giuseppe&quot; </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate a female first name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;female&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &quot;Anna&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate multiple names</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstNames</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; [&quot;Marco&quot;, &quot;Giuseppe&quot;, &quot;Luigi&quot;]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate with options</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gender: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;female&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  region: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Lombardia&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Regional frequency if available</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  birthYear: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1980</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Name popularity for that year</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h3 id="api-reference" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference" aria-label="Permalink to &quot;API Reference&quot;">​</a></h3><h4 id="firstname-options-personoptions" tabindex="-1"><code>firstName(options?: PersonOptions)</code> <a class="header-anchor" href="#firstname-options-personoptions" aria-label="Permalink to &quot;\`firstName(options?: PersonOptions)\`&quot;">​</a></h4><p>Generates a single Italian first name.</p><p><strong>Options:</strong></p><h2 id="parameter-type-description" tabindex="-1">| Parameter | Type | Description | | <a class="header-anchor" href="#parameter-type-description" aria-label="Permalink to &quot;|
 Parameter 
|
 Type 
|
 Description 
|
|&quot;">​</a></h2><h2 id="" tabindex="-1">| <a class="header-anchor" href="#" aria-label="Permalink to &quot;|&quot;">​</a></h2><h2 id="-1" tabindex="-1">| <a class="header-anchor" href="#-1" aria-label="Permalink to &quot;|&quot;">​</a></h2><p>| | <code>gender</code> | <code>&#39;male&#39; \\| &#39;female&#39;</code> | Specify gender for the name | | <code>region</code> | <code>string</code> | Italian region for regional frequency | | <code>birthYear</code> | <code>number</code> | Year of birth for historical name frequency |</p><p>Returns: <code>string</code></p><h4 id="firstnames-count-number-options-personoptions" tabindex="-1"><code>firstNames(count: number, options?: PersonOptions)</code> <a class="header-anchor" href="#firstnames-count-number-options-personoptions" aria-label="Permalink to &quot;\`firstNames(count: number, options?: PersonOptions)\`&quot;">​</a></h4><p>Generates multiple Italian first names.</p><p>Returns: <code>string[]</code></p><h2 id="surnames" tabindex="-1">Surnames <a class="header-anchor" href="#surnames" aria-label="Permalink to &quot;Surnames&quot;">​</a></h2><p>Generate Italian surnames based on provincial frequency distributions from ISTAT data.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate a random surname</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lastName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &quot;Rossi&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate with provincial frequency</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lastName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  province: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;MI&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Uses Milan province distribution</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &quot;Colombo&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate multiple surnames</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lastNames</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; [&quot;Rossi&quot;, &quot;Ferrari&quot;, &quot;Bianchi&quot;]</span></span></code></pre></div><h3 id="api-reference-1" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference-1" aria-label="Permalink to &quot;API Reference&quot;">​</a></h3><h4 id="lastname-options-surnameoptions" tabindex="-1"><code>lastName(options?: SurnameOptions)</code> <a class="header-anchor" href="#lastname-options-surnameoptions" aria-label="Permalink to &quot;\`lastName(options?: SurnameOptions)\`&quot;">​</a></h4><p>Generates a single Italian surname.</p><p><strong>Options:</strong></p><h2 id="parameter-type-description-1" tabindex="-1">| Parameter | Type | Description | | <a class="header-anchor" href="#parameter-type-description-1" aria-label="Permalink to &quot;|
 Parameter 
|
 Type 
|
 Description 
|
|&quot;">​</a></h2><h2 id="-2" tabindex="-1">| <a class="header-anchor" href="#-2" aria-label="Permalink to &quot;|&quot;">​</a></h2><h2 id="-3" tabindex="-1">| <a class="header-anchor" href="#-3" aria-label="Permalink to &quot;|&quot;">​</a></h2><p>| | <code>province</code> | <code>string</code> | Italian province code for local frequency | | <code>region</code> | <code>string</code> | Italian region for regional frequency |</p><p>Returns: <code>string</code></p><h4 id="lastnames-count-number-options-surnameoptions" tabindex="-1"><code>lastNames(count: number, options?: SurnameOptions)</code> <a class="header-anchor" href="#lastnames-count-number-options-surnameoptions" aria-label="Permalink to &quot;\`lastNames(count: number, options?: SurnameOptions)\`&quot;">​</a></h4><p>Generates multiple Italian surnames.</p><p>Returns: <code>string[]</code></p><h2 id="fiscal-code" tabindex="-1">Fiscal Code <a class="header-anchor" href="#fiscal-code" aria-label="Permalink to &quot;Fiscal Code&quot;">​</a></h2><p>Generate valid Italian fiscal codes (Codice Fiscale) consistent with the person&#39;s data.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate a random fiscal code</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fiscalCode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &quot;RSSMRA80A01H501U&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate fiscal code with specific person data</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fiscalCode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  firstName: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Mario&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  lastName: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Rossi&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gender: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;male&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  birthDate: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1980-01-01&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  birthPlace: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Roma&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &quot;RSSMRA80A01H501U&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Validate a fiscal code</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">faker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">validateFiscalCode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;RSSMRA80A01H501U&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; true</span></span></code></pre></div><h3 id="api-reference-2" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference-2" aria-label="Permalink to &quot;API Reference&quot;">​</a></h3><h4 id="fiscalcode-options-fiscalcodeoptions" tabindex="-1"><code>fiscalCode(options?: FiscalCodeOptions)</code> <a class="header-anchor" href="#fiscalcode-options-fiscalcodeoptions" aria-label="Permalink to &quot;\`fiscalCode(options?: FiscalCodeOptions)\`&quot;">​</a></h4><p>Generates a valid Italian fiscal code.</p><p><strong>Options:</strong></p><h2 id="parameter-type-description-2" tabindex="-1">| Parameter | Type | Description | | <a class="header-anchor" href="#parameter-type-description-2" aria-label="Permalink to &quot;|
 Parameter 
|
 Type 
|
 Description 
|
|&quot;">​</a></h2><h2 id="-4" tabindex="-1">| <a class="header-anchor" href="#-4" aria-label="Permalink to &quot;|&quot;">​</a></h2><h2 id="-5" tabindex="-1">| <a class="header-anchor" href="#-5" aria-label="Permalink to &quot;|&quot;">​</a></h2><p>| | <code>firstName</code> | <code>string</code> | Person&#39;s first name | | <code>lastName</code> | <code>string</code> | Person&#39;s last name | | <code>gender</code> | <code>&#39;male&#39; \\| &#39;female&#39;</code> | Person&#39;s gender | | <code>birthDate</code> | <code>string \\| Date</code> | Date of birth | | <code>birthPlace</code> | <code>string</code> | Place of birth (municipality) |</p><p>Returns: <code>string</code></p><h4 id="validatefiscalcode-code-string" tabindex="-1"><code>validateFiscalCode(code: string)</code> <a class="header-anchor" href="#validatefiscalcode-code-string" aria-label="Permalink to &quot;\`validateFiscalCode(code: string)\`&quot;">​</a></h4><p>Validates an Italian fiscal code.</p><p>Returns: <code>boolean</code></p><h2 id="data-sources" tabindex="-1">Data Sources <a class="header-anchor" href="#data-sources" aria-label="Permalink to &quot;Data Sources&quot;">​</a></h2><ul><li>Names and surnames frequencies: ISTAT demographic data</li><li>Geographic data: Latest ISTAT administrative divisions</li><li>Fiscal code algorithm: Official Italian government specifications</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Use <code>faker.seed()</code> to generate consistent data across multiple runs</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>While the generated data follows real demographic distributions, it should only be used for testing purposes</p></div>`,51)]))}const E=a(t,[["render",l]]);export{c as __pageData,E as default};
