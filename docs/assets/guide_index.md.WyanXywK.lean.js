import{_ as i,b as a,a5 as t,a as n}from"./chunks/framework.BCpa0c8T.js";const g=JSON.parse('{"title":"Getting Started with IT-Faker","description":"","frontmatter":{},"headers":[],"relativePath":"guide/index.md","filePath":"guide/index.md"}'),e={name:"guide/index.md"};function l(h,s,p,k,r,d){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="getting-started-with-it-faker" tabindex="-1">Getting Started with IT-Faker <a class="header-anchor" href="#getting-started-with-it-faker" aria-label="Permalink to &quot;Getting Started with IT-Faker&quot;">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>IT-Faker is a specialized data generation library built on top of Faker.js, specifically designed for generating realistic Italian data. It provides coherent and statistically accurate data generation for Italian names, addresses, fiscal codes, and more.</p><h2 id="key-features" tabindex="-1">Key Features <a class="header-anchor" href="#key-features" aria-label="Permalink to &quot;Key Features&quot;">​</a></h2><ul><li>🗺 <strong>Coherent Geographic Data</strong>: Generate consistent combinations of cities, provinces, and regions</li><li>👤 <strong>Realistic Personal Data</strong>: Names based on ISTAT statistics and region-specific surnames</li><li>📝 <strong>Valid Fiscal Codes</strong>: Generate fiscal codes that match the person&#39;s data</li><li>📍 <strong>Accurate Addresses</strong>: Create consistent Italian addresses</li><li>📊 <strong>Statistical Accuracy</strong>: Name distribution based on real Italian demographics</li></ul><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Using npm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @italia-tools/faker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Using yarn</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @italia-tools/faker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Using pnpm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @italia-tools/faker</span></span></code></pre></div><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><h3 id="importing-the-library" tabindex="-1">Importing the Library <a class="header-anchor" href="#importing-the-library" aria-label="Permalink to &quot;Importing the Library&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { itFaker } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@italia-tools/faker&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h3 id="generate-coherent-personal-data" tabindex="-1">Generate Coherent Personal Data <a class="header-anchor" href="#generate-coherent-personal-data" aria-label="Permalink to &quot;Generate Coherent Personal Data&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate a complete person with consistent data</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> person</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPerson.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generatePerson</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Returns an object with name, surname, fiscal code, and address</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// All data is coherent (e.g., fiscal code matches the person&#39;s details)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate individual components</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPerson.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ gender: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;female&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Statistically accurate Italian first name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> surname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPerson.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lastName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Random last name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> fullName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPerson.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fullName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ gender: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;male&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Full name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> fiscalCode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPerson.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fiscalCode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Valid Italian fiscal code</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> localPerson</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPerson.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generatePerson</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ province: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bolzano&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Last name  based on the actual distribution in the province</span></span></code></pre></div><h3 id="generate-location-data" tabindex="-1">Generate Location Data <a class="header-anchor" href="#generate-location-data" aria-label="Permalink to &quot;Generate Location Data&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate coherent geographic data</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> address</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPlace.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fullAddress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Returns a complete Italian address with consistent city, province, and region</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Generate specific location components</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> randomCity</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPlace.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">randomCity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();         </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Real Italian city with name, code, zone, province and region</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cityByRegion</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPlace.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">city</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ region: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Lombardia&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// City matching the region/province</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> region</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.places.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">region</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Random italian region</span></span></code></pre></div><h2 id="typescript-support" tabindex="-1">TypeScript Support <a class="header-anchor" href="#typescript-support" aria-label="Permalink to &quot;TypeScript Support&quot;">​</a></h2><p>IT-Faker is written in TypeScript and provides full type definitions out of the box. All generated data comes with proper typing:</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  firstName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  lastName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  fiscalCode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  address</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Address</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Address</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  street</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  city</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  province</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  region</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  zipCode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="integration-with-faker-js" tabindex="-1">Integration with Faker.js <a class="header-anchor" href="#integration-with-faker-js" aria-label="Permalink to &quot;Integration with Faker.js&quot;">​</a></h2><p>Although we recommend using IT-Faker as it takes into account the actual Italian statistical distribution of data, you can still use the standard Faker.js methods. IT-Faker extends Faker.js&#39;s Italian locale by adding functionalities specific to the Italian context. You can use it alongside standard Faker.js methods, taking advantage of both the basic features and specialized Italian data generation.:</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Mix IT-Faker with regular Faker.js methods</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> phoneNumber</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.itPerson.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// IT-Faker format</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> email</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itFaker.person.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firstName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Regular Faker.js method</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li>Check out the <a href="/it-faker/modules/">Modules</a> section for detailed documentation of each module</li><li>See <a href="/it-faker/examples/basic-usage.html">Examples</a> for more usage patterns</li><li>Explore the complete <a href="/it-faker/api/">API Reference</a> for all available methods</li></ul>`,22)]))}const c=i(e,[["render",l]]);export{g as __pageData,c as default};
