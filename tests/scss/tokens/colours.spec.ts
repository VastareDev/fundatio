// tests/scss/tokens/colours.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If a token is wrong, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks (e.g. #ffffff -> #fff).
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "tokens/colours" as colours;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the pipeline always produces CSS output.
      .__sol_token_test__ { content: "ok"; }
    `,
      header
    );
  }).not.toThrow();
}

describe("tokens/colours", () => {
  it("matches neutral tokens exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$white != #ffffff { @error "Expected $white to be #ffffff"; }
      @if colours.$base-grey != #adb5bd { @error "Expected $base-grey to be #adb5bd"; }
      @if colours.$black != #000000 { @error "Expected $black to be #000000"; }
    `);
  });

  it("matches base hues exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$base-blue != #233b4e { @error "Expected $base-blue to be #233b4e"; }
      @if colours.$base-indigo != #4b3869 { @error "Expected $base-indigo to be #4b3869"; }
      @if colours.$base-purple != #6a0572 { @error "Expected $base-purple to be #6a0572"; }
      @if colours.$base-pink != #d72638 { @error "Expected $base-pink to be #d72638"; }
      @if colours.$base-red != #ba1b1d { @error "Expected $base-red to be #ba1b1d"; }
      @if colours.$base-orange != #f39237 { @error "Expected $base-orange to be #f39237"; }
      @if colours.$base-yellow != #ffcb05 { @error "Expected $base-yellow to be #ffcb05"; }
      @if colours.$base-green != #2e8540 { @error "Expected $base-green to be #2e8540"; }
      @if colours.$base-teal != #008080 { @error "Expected $base-teal to be #008080"; }
      @if colours.$base-cyan != #00bcd4 { @error "Expected $base-cyan to be #00bcd4"; }
    `);
  });

  it("matches grey ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$grey-tint-90 != #fcfcfc { @error "Expected $grey-tint-90 to be #fcfcfc"; }
      @if colours.$grey-tint-80 != #f8f9fa { @error "Expected $grey-tint-80 to be #f8f9fa"; }
      @if colours.$grey-tint-70 != #f0f2f4 { @error "Expected $grey-tint-70 to be #f0f2f4"; }
      @if colours.$grey-tint-60 != #e9ecef { @error "Expected $grey-tint-60 to be #e9ecef"; }
      @if colours.$grey-tint-50 != #e4e7ea { @error "Expected $grey-tint-50 to be #e4e7ea"; }
      @if colours.$grey-tint-40 != #dee2e6 { @error "Expected $grey-tint-40 to be #dee2e6"; }
      @if colours.$grey-tint-30 != #d6dbe0 { @error "Expected $grey-tint-30 to be #d6dbe0"; }
      @if colours.$grey-tint-20 != #ced4da { @error "Expected $grey-tint-20 to be #ced4da"; }
      @if colours.$grey-tint-10 != #bec4cc { @error "Expected $grey-tint-10 to be #bec4cc"; }
      @if colours.$grey-shade-10 != #8c959d { @error "Expected $grey-shade-10 to be #8c959d"; }
      @if colours.$grey-shade-20 != #6c757d { @error "Expected $grey-shade-20 to be #6c757d"; }
      @if colours.$grey-shade-30 != #5a626a { @error "Expected $grey-shade-30 to be #5a626a"; }
      @if colours.$grey-shade-40 != #495057 { @error "Expected $grey-shade-40 to be #495057"; }
      @if colours.$grey-shade-50 != #3e454c { @error "Expected $grey-shade-50 to be #3e454c"; }
      @if colours.$grey-shade-60 != #343a40 { @error "Expected $grey-shade-60 to be #343a40"; }
      @if colours.$grey-shade-70 != #2a3034 { @error "Expected $grey-shade-70 to be #2a3034"; }
      @if colours.$grey-shade-80 != #212529 { @error "Expected $grey-shade-80 to be #212529"; }
      @if colours.$grey-shade-90 != #101214 { @error "Expected $grey-shade-90 to be #101214"; }
    `);
  });

  it("matches blue ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$blue-tint-90 != #e4e8ec { @error "Expected $blue-tint-90 to be #e4e8ec"; }
      @if colours.$blue-tint-80 != #c9d1d8 { @error "Expected $blue-tint-80 to be #c9d1d8"; }
      @if colours.$blue-tint-70 != #b7c0ca { @error "Expected $blue-tint-70 to be #b7c0ca"; }
      @if colours.$blue-tint-60 != #a5b0bd { @error "Expected $blue-tint-60 to be #a5b0bd"; }
      @if colours.$blue-tint-50 != #909eac { @error "Expected $blue-tint-50 to be #909eac"; }
      @if colours.$blue-tint-40 != #7b8c9c { @error "Expected $blue-tint-40 to be #7b8c9c"; }
      @if colours.$blue-tint-30 != #657786 { @error "Expected $blue-tint-30 to be #657786"; }
      @if colours.$blue-tint-20 != #4f6271 { @error "Expected $blue-tint-20 to be #4f6271"; }
      @if colours.$blue-tint-10 != #394e60 { @error "Expected $blue-tint-10 to be #394e60"; }
      @if colours.$blue-shade-10 != #21384a { @error "Expected $blue-shade-10 to be #21384a"; }
      @if colours.$blue-shade-20 != #1f3646 { @error "Expected $blue-shade-20 to be #1f3646"; }
      @if colours.$blue-shade-30 != #1e3344 { @error "Expected $blue-shade-30 to be #1e3344"; }
      @if colours.$blue-shade-40 != #1c3041 { @error "Expected $blue-shade-40 to be #1c3041"; }
      @if colours.$blue-shade-50 != #192a38 { @error "Expected $blue-shade-50 to be #192a38"; }
      @if colours.$blue-shade-60 != #16252f { @error "Expected $blue-shade-60 to be #16252f"; }
      @if colours.$blue-shade-70 != #121d26 { @error "Expected $blue-shade-70 to be #121d26"; }
      @if colours.$blue-shade-80 != #0e151c { @error "Expected $blue-shade-80 to be #0e151c"; }
      @if colours.$blue-shade-90 != #070a0e { @error "Expected $blue-shade-90 to be #070a0e"; }
    `);
  });

  it("matches indigo ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$indigo-tint-90 != #edebf0 { @error "Expected $indigo-tint-90 to be #edebf0"; }
      @if colours.$indigo-tint-80 != #dbd7e1 { @error "Expected $indigo-tint-80 to be #dbd7e1"; }
      @if colours.$indigo-tint-70 != #c9c3d2 { @error "Expected $indigo-tint-70 to be #c9c3d2"; }
      @if colours.$indigo-tint-60 != #b7afc3 { @error "Expected $indigo-tint-60 to be #b7afc3"; }
      @if colours.$indigo-tint-50 != #a59cb4 { @error "Expected $indigo-tint-50 to be #a59cb4"; }
      @if colours.$indigo-tint-40 != #9388a5 { @error "Expected $indigo-tint-40 to be #9388a5"; }
      @if colours.$indigo-tint-30 != #817496 { @error "Expected $indigo-tint-30 to be #817496"; }
      @if colours.$indigo-tint-20 != #6f6087 { @error "Expected $indigo-tint-20 to be #6f6087"; }
      @if colours.$indigo-tint-10 != #5d4c78 { @error "Expected $indigo-tint-10 to be #5d4c78"; }
      @if colours.$indigo-shade-10 != #483564 { @error "Expected $indigo-shade-10 to be #483564"; }
      @if colours.$indigo-shade-20 != #44325e { @error "Expected $indigo-shade-20 to be #44325e"; }
      @if colours.$indigo-shade-30 != #403059 { @error "Expected $indigo-shade-30 to be #403059"; }
      @if colours.$indigo-shade-40 != #3c2d54 { @error "Expected $indigo-shade-40 to be #3c2d54"; }
      @if colours.$indigo-shade-50 != #34284a { @error "Expected $indigo-shade-50 to be #34284a"; }
      @if colours.$indigo-shade-60 != #2d223f { @error "Expected $indigo-shade-60 to be #2d223f"; }
      @if colours.$indigo-shade-70 != #261c34 { @error "Expected $indigo-shade-70 to be #261c34"; }
      @if colours.$indigo-shade-80 != #1e162a { @error "Expected $indigo-shade-80 to be #1e162a"; }
      @if colours.$indigo-shade-90 != #0f0b15 { @error "Expected $indigo-shade-90 to be #0f0b15"; }
    `);
  });

  it("matches purple ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$purple-tint-90 != #f0e6f1 { @error "Expected $purple-tint-90 to be #f0e6f1"; }
      @if colours.$purple-tint-80 != #e1cde3 { @error "Expected $purple-tint-80 to be #e1cde3"; }
      @if colours.$purple-tint-70 != #d2b4d5 { @error "Expected $purple-tint-70 to be #d2b4d5"; }
      @if colours.$purple-tint-60 != #c39bc7 { @error "Expected $purple-tint-60 to be #c39bc7"; }
      @if colours.$purple-tint-50 != #b482b8 { @error "Expected $purple-tint-50 to be #b482b8"; }
      @if colours.$purple-tint-40 != #a669aa { @error "Expected $purple-tint-40 to be #a669aa"; }
      @if colours.$purple-tint-30 != #97509c { @error "Expected $purple-tint-30 to be #97509c"; }
      @if colours.$purple-tint-20 != #88378e { @error "Expected $purple-tint-20 to be #88378e"; }
      @if colours.$purple-tint-10 != #791e80 { @error "Expected $purple-tint-10 to be #791e80"; }
      @if colours.$purple-shade-10 != #64046c { @error "Expected $purple-shade-10 to be #64046c"; }
      @if colours.$purple-shade-20 != #5f0467 { @error "Expected $purple-shade-20 to be #5f0467"; }
      @if colours.$purple-shade-30 != #5a0461 { @error "Expected $purple-shade-30 to be #5a0461"; }
      @if colours.$purple-shade-40 != #55045b { @error "Expected $purple-shade-40 to be #55045b"; }
      @if colours.$purple-shade-50 != #4a0450 { @error "Expected $purple-shade-50 to be #4a0450"; }
      @if colours.$purple-shade-60 != #400344 { @error "Expected $purple-shade-60 to be #400344"; }
      @if colours.$purple-shade-70 != #350239 { @error "Expected $purple-shade-70 to be #350239"; }
      @if colours.$purple-shade-80 != #2a022e { @error "Expected $purple-shade-80 to be #2a022e"; }
      @if colours.$purple-shade-90 != #150117 { @error "Expected $purple-shade-90 to be #150117"; }
    `);
  });

  it("matches pink ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$pink-tint-90 != #fbeaeb { @error "Expected $pink-tint-90 to be #fbeaeb"; }
      @if colours.$pink-tint-80 != #f7d4d7 { @error "Expected $pink-tint-80 to be #f7d4d7"; }
      @if colours.$pink-tint-70 != #f3bec3 { @error "Expected $pink-tint-70 to be #f3bec3"; }
      @if colours.$pink-tint-60 != #efa8af { @error "Expected $pink-tint-60 to be #efa8af"; }
      @if colours.$pink-tint-50 != #eb929c { @error "Expected $pink-tint-50 to be #eb929c"; }
      @if colours.$pink-tint-40 != #e77d88 { @error "Expected $pink-tint-40 to be #e77d88"; }
      @if colours.$pink-tint-30 != #e36774 { @error "Expected $pink-tint-30 to be #e36774"; }
      @if colours.$pink-tint-20 != #df5160 { @error "Expected $pink-tint-20 to be #df5160"; }
      @if colours.$pink-tint-10 != #db3c4c { @error "Expected $pink-tint-10 to be #db3c4c"; }
      @if colours.$pink-shade-10 != #cc2435 { @error "Expected $pink-shade-10 to be #cc2435"; }
      @if colours.$pink-shade-20 != #c22232 { @error "Expected $pink-shade-20 to be #c22232"; }
      @if colours.$pink-shade-30 != #b72030 { @error "Expected $pink-shade-30 to be #b72030"; }
      @if colours.$pink-shade-40 != #ac1e2d { @error "Expected $pink-shade-40 to be #ac1e2d"; }
      @if colours.$pink-shade-50 != #961a28 { @error "Expected $pink-shade-50 to be #961a28"; }
      @if colours.$pink-shade-60 != #811722 { @error "Expected $pink-shade-60 to be #811722"; }
      @if colours.$pink-shade-70 != #6c131c { @error "Expected $pink-shade-70 to be #6c131c"; }
      @if colours.$pink-shade-80 != #560f16 { @error "Expected $pink-shade-80 to be #560f16"; }
      @if colours.$pink-shade-90 != #2b080b { @error "Expected $pink-shade-90 to be #2b080b"; }
    `);
  });

  it("matches red ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$red-tint-90 != #f8e8e8 { @error "Expected $red-tint-90 to be #f8e8e8"; }
      @if colours.$red-tint-80 != #f1d1d2 { @error "Expected $red-tint-80 to be #f1d1d2"; }
      @if colours.$red-tint-70 != #eababc { @error "Expected $red-tint-70 to be #eababc"; }
      @if colours.$red-tint-60 != #e3a4a5 { @error "Expected $red-tint-60 to be #e3a4a5"; }
      @if colours.$red-tint-50 != #dc8d8e { @error "Expected $red-tint-50 to be #dc8d8e"; }
      @if colours.$red-tint-40 != #d67677 { @error "Expected $red-tint-40 to be #d67677"; }
      @if colours.$red-tint-30 != #cf6060 { @error "Expected $red-tint-30 to be #cf6060"; }
      @if colours.$red-tint-20 != #c8494a { @error "Expected $red-tint-20 to be #c8494a"; }
      @if colours.$red-tint-10 != #c13234 { @error "Expected $red-tint-10 to be #c13234"; }
      @if colours.$red-shade-10 != #b01a1c { @error "Expected $red-shade-10 to be #b01a1c"; }
      @if colours.$red-shade-20 != #a7181a { @error "Expected $red-shade-20 to be #a7181a"; }
      @if colours.$red-shade-30 != #9e1718 { @error "Expected $red-shade-30 to be #9e1718"; }
      @if colours.$red-shade-40 != #951617 { @error "Expected $red-shade-40 to be #951617"; }
      @if colours.$red-shade-50 != #821314 { @error "Expected $red-shade-50 to be #821314"; }
      @if colours.$red-shade-60 != #701011 { @error "Expected $red-shade-60 to be #701011"; }
      @if colours.$red-shade-70 != #5d0e0e { @error "Expected $red-shade-70 to be #5d0e0e"; }
      @if colours.$red-shade-80 != #4a0b0c { @error "Expected $red-shade-80 to be #4a0b0c"; }
      @if colours.$red-shade-90 != #250606 { @error "Expected $red-shade-90 to be #250606"; }
    `);
  });

  it("matches orange ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$orange-tint-90 != #fef4eb { @error "Expected $orange-tint-90 to be #fef4eb"; }
      @if colours.$orange-tint-80 != #fde9d7 { @error "Expected $orange-tint-80 to be #fde9d7"; }
      @if colours.$orange-tint-70 != #fcdec3 { @error "Expected $orange-tint-70 to be #fcdec3"; }
      @if colours.$orange-tint-60 != #fad3af { @error "Expected $orange-tint-60 to be #fad3af"; }
      @if colours.$orange-tint-50 != #f9c89b { @error "Expected $orange-tint-50 to be #f9c89b"; }
      @if colours.$orange-tint-40 != #f8be87 { @error "Expected $orange-tint-40 to be #f8be87"; }
      @if colours.$orange-tint-30 != #f6b373 { @error "Expected $orange-tint-30 to be #f6b373"; }
      @if colours.$orange-tint-20 != #f5a85f { @error "Expected $orange-tint-20 to be #f5a85f"; }
      @if colours.$orange-tint-10 != #f49d4b { @error "Expected $orange-tint-10 to be #f49d4b"; }
      @if colours.$orange-shade-10 != #e78a34 { @error "Expected $orange-shade-10 to be #e78a34"; }
      @if colours.$orange-shade-20 != #db8332 { @error "Expected $orange-shade-20 to be #db8332"; }
      @if colours.$orange-shade-30 != #ce7c2f { @error "Expected $orange-shade-30 to be #ce7c2f"; }
      @if colours.$orange-shade-40 != #c2752c { @error "Expected $orange-shade-40 to be #c2752c"; }
      @if colours.$orange-shade-50 != #aa6626 { @error "Expected $orange-shade-50 to be #aa6626"; }
      @if colours.$orange-shade-60 != #925821 { @error "Expected $orange-shade-60 to be #925821"; }
      @if colours.$orange-shade-70 != #7a491c { @error "Expected $orange-shade-70 to be #7a491c"; }
      @if colours.$orange-shade-80 != #613a16 { @error "Expected $orange-shade-80 to be #613a16"; }
      @if colours.$orange-shade-90 != #301d0b { @error "Expected $orange-shade-90 to be #301d0b"; }
    `);
  });

  it("matches yellow ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$yellow-tint-90 != #fffae6 { @error "Expected $yellow-tint-90 to be #fffae6"; }
      @if colours.$yellow-tint-80 != #fff4cc { @error "Expected $yellow-tint-80 to be #fff4cc"; }
      @if colours.$yellow-tint-70 != #ffeeb2 { @error "Expected $yellow-tint-70 to be #ffeeb2"; }
      @if colours.$yellow-tint-60 != #ffe999 { @error "Expected $yellow-tint-60 to be #ffe999"; }
      @if colours.$yellow-tint-50 != #ffe380 { @error "Expected $yellow-tint-50 to be #ffe380"; }
      @if colours.$yellow-tint-40 != #ffdd66 { @error "Expected $yellow-tint-40 to be #ffdd66"; }
      @if colours.$yellow-tint-30 != #ffd84c { @error "Expected $yellow-tint-30 to be #ffd84c"; }
      @if colours.$yellow-tint-20 != #ffd233 { @error "Expected $yellow-tint-20 to be #ffd233"; }
      @if colours.$yellow-tint-10 != #ffce1c { @error "Expected $yellow-tint-10 to be #ffce1c"; }
      @if colours.$yellow-shade-10 != #f2c005 { @error "Expected $yellow-shade-10 to be #f2c005"; }
      @if colours.$yellow-shade-20 != #e6b505 { @error "Expected $yellow-shade-20 to be #e6b505"; }
      @if colours.$yellow-shade-30 != #d9aa04 { @error "Expected $yellow-shade-30 to be #d9aa04"; }
      @if colours.$yellow-shade-40 != #cc9f04 { @error "Expected $yellow-shade-40 to be #cc9f04"; }
      @if colours.$yellow-shade-50 != #b28a04 { @error "Expected $yellow-shade-50 to be #b28a04"; }
      @if colours.$yellow-shade-60 != #997503 { @error "Expected $yellow-shade-60 to be #997503"; }
      @if colours.$yellow-shade-70 != #806002 { @error "Expected $yellow-shade-70 to be #806002"; }
      @if colours.$yellow-shade-80 != #664c02 { @error "Expected $yellow-shade-80 to be #664c02"; }
      @if colours.$yellow-shade-90 != #332601 { @error "Expected $yellow-shade-90 to be #332601"; }
    `);
  });

  it("matches green ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$green-tint-90 != #e6f1e8 { @error "Expected $green-tint-90 to be #e6f1e8"; }
      @if colours.$green-tint-80 != #cde3d1 { @error "Expected $green-tint-80 to be #cde3d1"; }
      @if colours.$green-tint-70 != #b4d5ba { @error "Expected $green-tint-70 to be #b4d5ba"; }
      @if colours.$green-tint-60 != #9bc7a3 { @error "Expected $green-tint-60 to be #9bc7a3"; }
      @if colours.$green-tint-50 != #82b88c { @error "Expected $green-tint-50 to be #82b88c"; }
      @if colours.$green-tint-40 != #69aa75 { @error "Expected $green-tint-40 to be #69aa75"; }
      @if colours.$green-tint-30 != #509c5e { @error "Expected $green-tint-30 to be #509c5e"; }
      @if colours.$green-tint-20 != #378e47 { @error "Expected $green-tint-20 to be #378e47"; }
      @if colours.$green-tint-10 != #328a44 { @error "Expected $green-tint-10 to be #328a44"; }
      @if colours.$green-shade-10 != #2c7e3c { @error "Expected $green-shade-10 to be #2c7e3c"; }
      @if colours.$green-shade-20 != #297839 { @error "Expected $green-shade-20 to be #297839"; }
      @if colours.$green-shade-30 != #277136 { @error "Expected $green-shade-30 to be #277136"; }
      @if colours.$green-shade-40 != #256a33 { @error "Expected $green-shade-40 to be #256a33"; }
      @if colours.$green-shade-50 != #205c2c { @error "Expected $green-shade-50 to be #205c2c"; }
      @if colours.$green-shade-60 != #1c4f26 { @error "Expected $green-shade-60 to be #1c4f26"; }
      @if colours.$green-shade-70 != #184220 { @error "Expected $green-shade-70 to be #184220"; }
      @if colours.$green-shade-80 != #13341a { @error "Expected $green-shade-80 to be #13341a"; }
      @if colours.$green-shade-90 != #0a1a0d { @error "Expected $green-shade-90 to be #0a1a0d"; }
    `);
  });

  it("matches teal ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$teal-tint-90 != #e6f6f6 { @error "Expected $teal-tint-90 to be #e6f6f6"; }
      @if colours.$teal-tint-80 != #cceded { @error "Expected $teal-tint-80 to be #cceded"; }
      @if colours.$teal-tint-70 != #b2e4e4 { @error "Expected $teal-tint-70 to be #b2e4e4"; }
      @if colours.$teal-tint-60 != #99dbdb { @error "Expected $teal-tint-60 to be #99dbdb"; }
      @if colours.$teal-tint-50 != #80d2d2 { @error "Expected $teal-tint-50 to be #80d2d2"; }
      @if colours.$teal-tint-40 != #66c9c9 { @error "Expected $teal-tint-40 to be #66c9c9"; }
      @if colours.$teal-tint-30 != #4cc0c0 { @error "Expected $teal-tint-30 to be #4cc0c0"; }
      @if colours.$teal-tint-20 != #33b7b7 { @error "Expected $teal-tint-20 to be #33b7b7"; }
      @if colours.$teal-tint-10 != #1a9c9c { @error "Expected $teal-tint-10 to be #1a9c9c"; }
      @if colours.$teal-shade-10 != #007a7a { @error "Expected $teal-shade-10 to be #007a7a"; }
      @if colours.$teal-shade-20 != #007373 { @error "Expected $teal-shade-20 to be #007373"; }
      @if colours.$teal-shade-30 != #006c6c { @error "Expected $teal-shade-30 to be #006c6c"; }
      @if colours.$teal-shade-40 != #006666 { @error "Expected $teal-shade-40 to be #006666"; }
      @if colours.$teal-shade-50 != #005959 { @error "Expected $teal-shade-50 to be #005959"; }
      @if colours.$teal-shade-60 != #004c4c { @error "Expected $teal-shade-60 to be #004c4c"; }
      @if colours.$teal-shade-70 != #004040 { @error "Expected $teal-shade-70 to be #004040"; }
      @if colours.$teal-shade-80 != #003333 { @error "Expected $teal-shade-80 to be #003333"; }
      @if colours.$teal-shade-90 != #001a1a { @error "Expected $teal-shade-90 to be #001a1a"; }
    `);
  });

  it("matches cyan ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$cyan-tint-90 != #e6f8fb { @error "Expected $cyan-tint-90 to be #e6f8fb"; }
      @if colours.$cyan-tint-80 != #ccf2f7 { @error "Expected $cyan-tint-80 to be #ccf2f7"; }
      @if colours.$cyan-tint-70 != #b2ecf3 { @error "Expected $cyan-tint-70 to be #b2ecf3"; }
      @if colours.$cyan-tint-60 != #99e6ef { @error "Expected $cyan-tint-60 to be #99e6ef"; }
      @if colours.$cyan-tint-50 != #80e0eb { @error "Expected $cyan-tint-50 to be #80e0eb"; }
      @if colours.$cyan-tint-40 != #66d9e7 { @error "Expected $cyan-tint-40 to be #66d9e7"; }
      @if colours.$cyan-tint-30 != #4cd3e3 { @error "Expected $cyan-tint-30 to be #4cd3e3"; }
      @if colours.$cyan-tint-20 != #33cddf { @error "Expected $cyan-tint-20 to be #33cddf"; }
      @if colours.$cyan-tint-10 != #1ac4da { @error "Expected $cyan-tint-10 to be #1ac4da"; }
      @if colours.$cyan-shade-10 != #00b2ca { @error "Expected $cyan-shade-10 to be #00b2ca"; }
      @if colours.$cyan-shade-20 != #00a8bf { @error "Expected $cyan-shade-20 to be #00a8bf"; }
      @if colours.$cyan-shade-30 != #009eb4 { @error "Expected $cyan-shade-30 to be #009eb4"; }
      @if colours.$cyan-shade-40 != #0093aa { @error "Expected $cyan-shade-40 to be #0093aa"; }
      @if colours.$cyan-shade-50 != #007e94 { @error "Expected $cyan-shade-50 to be #007e94"; }
      @if colours.$cyan-shade-60 != #006a7f { @error "Expected $cyan-shade-60 to be #006a7f"; }
      @if colours.$cyan-shade-70 != #00556a { @error "Expected $cyan-shade-70 to be #00556a"; }
      @if colours.$cyan-shade-80 != #004054 { @error "Expected $cyan-shade-80 to be #004054"; }
      @if colours.$cyan-shade-90 != #00202a { @error "Expected $cyan-shade-90 to be #00202a"; }
    `);
  });

  it("enforces token types and ramp integrity", () => {
    expectSassAssertionsPass(`
      // ---------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------

      @function _assert-is-color($value, $name) {
        @if meta.type-of($value) != "color" {
          @error "Expected #{$name} to be a Sass color, got #{meta.type-of($value)}";
        }
        @return $value;
      }

      @function _assert-unique($values, $label) {
        $len: list.length($values);

        // IMPORTANT:
        // Sass @for loops run backwards when start > end, so we must not let the
        // inner loop start at ($i + 1) when $i == $len, or it will count down
        // and compare an index with itself.
        @if $len <= 1 { @return $values; }

        @for $i from 1 through ($len - 1) {
          @for $j from ($i + 1) through $len {
            @if list.nth($values, $i) == list.nth($values, $j) {
              @error "Duplicate value found in #{$label} at positions #{$i} and #{$j}";
            }
          }
        }

        @return $values;
      }

      // Ensures the list gets strictly darker as you progress through the list.
      @function _assert-monotonic-darker($values, $label) {
        $len: list.length($values);
        @if $len <= 1 { @return $values; }

        @for $i from 1 through ($len - 1) {
          $a: _assert-is-color(list.nth($values, $i), "#{$label}[#{$i}]");
          $b: _assert-is-color(list.nth($values, $i + 1), "#{$label}[#{$i + 1}]");

          $la: color.channel($a, "lightness", $space: hsl);
          $lb: color.channel($b, "lightness", $space: hsl);

          @if $lb >= $la {
            @error "Ramp integrity failure in #{$label}: expected step #{$i + 1} to be darker than step #{$i} (lightness #{$lb} >= #{$la})";
          }
        }

        @return $values;
      }

      // ---------------------------------------------------------------------
      // Type checks (primitives)
      // ---------------------------------------------------------------------

      $_: _assert-is-color(colours.$white, "$white");
      $_: _assert-is-color(colours.$base-grey, "$base-grey");
      $_: _assert-is-color(colours.$black, "$black");

      $_: _assert-is-color(colours.$base-blue, "$base-blue");
      $_: _assert-is-color(colours.$base-indigo, "$base-indigo");
      $_: _assert-is-color(colours.$base-purple, "$base-purple");
      $_: _assert-is-color(colours.$base-pink, "$base-pink");
      $_: _assert-is-color(colours.$base-red, "$base-red");
      $_: _assert-is-color(colours.$base-orange, "$base-orange");
      $_: _assert-is-color(colours.$base-yellow, "$base-yellow");
      $_: _assert-is-color(colours.$base-green, "$base-green");
      $_: _assert-is-color(colours.$base-teal, "$base-teal");
      $_: _assert-is-color(colours.$base-cyan, "$base-cyan");

      // ---------------------------------------------------------------------
      // Ramp integrity: Grey
      // ---------------------------------------------------------------------

      $grey-tints: (
        colours.$grey-tint-90,
        colours.$grey-tint-80,
        colours.$grey-tint-70,
        colours.$grey-tint-60,
        colours.$grey-tint-50,
        colours.$grey-tint-40,
        colours.$grey-tint-30,
        colours.$grey-tint-20,
        colours.$grey-tint-10
      );

      $grey-shades: (
        colours.$grey-shade-10,
        colours.$grey-shade-20,
        colours.$grey-shade-30,
        colours.$grey-shade-40,
        colours.$grey-shade-50,
        colours.$grey-shade-60,
        colours.$grey-shade-70,
        colours.$grey-shade-80,
        colours.$grey-shade-90
      );

      $_: _assert-unique($grey-tints, "grey tints");
      $_: _assert-unique($grey-shades, "grey shades");
      $_: _assert-monotonic-darker($grey-tints, "grey tints (90->10)");
      $_: _assert-monotonic-darker($grey-shades, "grey shades (10->90)");

      // ---------------------------------------------------------------------
      // Ramp integrity: Blue
      // ---------------------------------------------------------------------

      $blue-tints: (
        colours.$blue-tint-90,
        colours.$blue-tint-80,
        colours.$blue-tint-70,
        colours.$blue-tint-60,
        colours.$blue-tint-50,
        colours.$blue-tint-40,
        colours.$blue-tint-30,
        colours.$blue-tint-20,
        colours.$blue-tint-10
      );

      $blue-shades: (
        colours.$blue-shade-10,
        colours.$blue-shade-20,
        colours.$blue-shade-30,
        colours.$blue-shade-40,
        colours.$blue-shade-50,
        colours.$blue-shade-60,
        colours.$blue-shade-70,
        colours.$blue-shade-80,
        colours.$blue-shade-90
      );

      $_: _assert-unique($blue-tints, "blue tints");
      $_: _assert-unique($blue-shades, "blue shades");
      $_: _assert-monotonic-darker($blue-tints, "blue tints (90->10)");
      $_: _assert-monotonic-darker($blue-shades, "blue shades (10->90)");
    `);
  });
});
