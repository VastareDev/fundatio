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
      @if colours.$base-blue != #4d80b4 { @error "Expected $base-blue to be #4d80b4"; }
      @if colours.$base-indigo != #162e46 { @error "Expected $base-indigo to be #162e46"; }
      @if colours.$base-purple != #c15e89 { @error "Expected $base-purple to be #c15e89"; }
      @if colours.$base-pink != #ec89b7 { @error "Expected $base-pink to be #ec89b7"; }
      @if colours.$base-red != #dd0a54 { @error "Expected $base-red to be #dd0a54"; }
      @if colours.$base-orange != #da886b { @error "Expected $base-orange to be #da886b"; }
      @if colours.$base-yellow != #ffcf8b { @error "Expected $base-yellow to be #ffcf8b"; }
      @if colours.$base-green != #137647 { @error "Expected $base-green to be #137647"; }
      @if colours.$base-teal != #5ec095 { @error "Expected $base-teal to be #5ec095"; }
      @if colours.$base-cyan != #6bbcda { @error "Expected $base-cyan to be #6bbcda"; }
    `);
  });

  it("matches grey ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$grey-tint-90 != #fbfcfc { @error "Expected $grey-tint-90 to be #fbfcfc"; }
      @if colours.$grey-tint-80 != #f8f9fa { @error "Expected $grey-tint-80 to be #f8f9fa"; }
      @if colours.$grey-tint-70 != #f3f4f6 { @error "Expected $grey-tint-70 to be #f3f4f6"; }
      @if colours.$grey-tint-60 != #e9ecef { @error "Expected $grey-tint-60 to be #e9ecef"; }
      @if colours.$grey-tint-50 != #e3e5e8 { @error "Expected $grey-tint-50 to be #e3e5e8"; }
      @if colours.$grey-tint-40 != #dee2e6 { @error "Expected $grey-tint-40 to be #dee2e6"; }
      @if colours.$grey-tint-30 != #d6dadd { @error "Expected $grey-tint-30 to be #d6dadd"; }
      @if colours.$grey-tint-20 != #ced4da { @error "Expected $grey-tint-20 to be #ced4da"; }
      @if colours.$grey-tint-10 != #c5cbd1 { @error "Expected $grey-tint-10 to be #c5cbd1"; }
      @if colours.$grey-shade-10 != #7f8890 { @error "Expected $grey-shade-10 to be #7f8890"; }
      @if colours.$grey-shade-20 != #6c757d { @error "Expected $grey-shade-20 to be #6c757d"; }
      @if colours.$grey-shade-30 != #60686f { @error "Expected $grey-shade-30 to be #60686f"; }
      @if colours.$grey-shade-40 != #495057 { @error "Expected $grey-shade-40 to be #495057"; }
      @if colours.$grey-shade-50 != #3d4349 { @error "Expected $grey-shade-50 to be #3d4349"; }
      @if colours.$grey-shade-60 != #343a40 { @error "Expected $grey-shade-60 to be #343a40"; }
      @if colours.$grey-shade-70 != #2a2e33 { @error "Expected $grey-shade-70 to be #2a2e33"; }
      @if colours.$grey-shade-80 != #212529 { @error "Expected $grey-shade-80 to be #212529"; }
      @if colours.$grey-shade-90 != #181b1e { @error "Expected $grey-shade-90 to be #181b1e"; }
    `);
  });

  it("matches blue ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$blue-tint-90 != #edf2f8 { @error "Expected $blue-tint-90 to be #edf2f8"; }
      @if colours.$blue-tint-80 != #dbe6f0 { @error "Expected $blue-tint-80 to be #dbe6f0"; }
      @if colours.$blue-tint-70 != #cad9e8 { @error "Expected $blue-tint-70 to be #cad9e8"; }
      @if colours.$blue-tint-60 != #b8cce1 { @error "Expected $blue-tint-60 to be #b8cce1"; }
      @if colours.$blue-tint-50 != #a6c0da { @error "Expected $blue-tint-50 to be #a6c0da"; }
      @if colours.$blue-tint-40 != #94b3d2 { @error "Expected $blue-tint-40 to be #94b3d2"; }
      @if colours.$blue-tint-30 != #82a6ca { @error "Expected $blue-tint-30 to be #82a6ca"; }
      @if colours.$blue-tint-20 != #7199c3 { @error "Expected $blue-tint-20 to be #7199c3"; }
      @if colours.$blue-tint-10 != #5f8dbc { @error "Expected $blue-tint-10 to be #5f8dbc"; }
      @if colours.$blue-shade-10 != #4573a2 { @error "Expected $blue-shade-10 to be #4573a2"; }
      @if colours.$blue-shade-20 != #3e6690 { @error "Expected $blue-shade-20 to be #3e6690"; }
      @if colours.$blue-shade-30 != #365a7e { @error "Expected $blue-shade-30 to be #365a7e"; }
      @if colours.$blue-shade-40 != #2e4d6c { @error "Expected $blue-shade-40 to be #2e4d6c"; }
      @if colours.$blue-shade-50 != #26405a { @error "Expected $blue-shade-50 to be #26405a"; }
      @if colours.$blue-shade-60 != #1f3348 { @error "Expected $blue-shade-60 to be #1f3348"; }
      @if colours.$blue-shade-70 != #172636 { @error "Expected $blue-shade-70 to be #172636"; }
      @if colours.$blue-shade-80 != #0f1a24 { @error "Expected $blue-shade-80 to be #0f1a24"; }
      @if colours.$blue-shade-90 != #080d12 { @error "Expected $blue-shade-90 to be #080d12"; }
    `);
  });

  it("matches indigo ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$indigo-tint-90 != #e7eaec { @error "Expected $indigo-tint-90 to be #e7eaec"; }
      @if colours.$indigo-tint-80 != #d0d5da { @error "Expected $indigo-tint-80 to be #d0d5da"; }
      @if colours.$indigo-tint-70 != #b9c0c7 { @error "Expected $indigo-tint-70 to be #b9c0c7"; }
      @if colours.$indigo-tint-60 != #a1abb5 { @error "Expected $indigo-tint-60 to be #a1abb5"; }
      @if colours.$indigo-tint-50 != #8a96a2 { @error "Expected $indigo-tint-50 to be #8a96a2"; }
      @if colours.$indigo-tint-40 != #738190 { @error "Expected $indigo-tint-40 to be #738190"; }
      @if colours.$indigo-tint-30 != #5b6c7d { @error "Expected $indigo-tint-30 to be #5b6c7d"; }
      @if colours.$indigo-tint-20 != #44576b { @error "Expected $indigo-tint-20 to be #44576b"; }
      @if colours.$indigo-tint-10 != #2d4258 { @error "Expected $indigo-tint-10 to be #2d4258"; }
      @if colours.$indigo-shade-10 != #13293f { @error "Expected $indigo-shade-10 to be #13293f"; }
      @if colours.$indigo-shade-20 != #112438 { @error "Expected $indigo-shade-20 to be #112438"; }
      @if colours.$indigo-shade-30 != #0f2031 { @error "Expected $indigo-shade-30 to be #0f2031"; }
      @if colours.$indigo-shade-40 != #0d1b2a { @error "Expected $indigo-shade-40 to be #0d1b2a"; }
      @if colours.$indigo-shade-50 != #0b1723 { @error "Expected $indigo-shade-50 to be #0b1723"; }
      @if colours.$indigo-shade-60 != #08121c { @error "Expected $indigo-shade-60 to be #08121c"; }
      @if colours.$indigo-shade-70 != #060d15 { @error "Expected $indigo-shade-70 to be #060d15"; }
      @if colours.$indigo-shade-80 != #04090d { @error "Expected $indigo-shade-80 to be #04090d"; }
      @if colours.$indigo-shade-90 != #020406 { @error "Expected $indigo-shade-90 to be #020406"; }
    `);
  });

  it("matches purple ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$purple-tint-90 != #f8eef3 { @error "Expected $purple-tint-90 to be #f8eef3"; }
      @if colours.$purple-tint-80 != #f2dee7 { @error "Expected $purple-tint-80 to be #f2dee7"; }
      @if colours.$purple-tint-70 != #eccedb { @error "Expected $purple-tint-70 to be #eccedb"; }
      @if colours.$purple-tint-60 != #e6becf { @error "Expected $purple-tint-60 to be #e6becf"; }
      @if colours.$purple-tint-50 != #e0aec4 { @error "Expected $purple-tint-50 to be #e0aec4"; }
      @if colours.$purple-tint-40 != #d99eb8 { @error "Expected $purple-tint-40 to be #d99eb8"; }
      @if colours.$purple-tint-30 != #d38eac { @error "Expected $purple-tint-30 to be #d38eac"; }
      @if colours.$purple-tint-20 != #cd7ea0 { @error "Expected $purple-tint-20 to be #cd7ea0"; }
      @if colours.$purple-tint-10 != #c76e94 { @error "Expected $purple-tint-10 to be #c76e94"; }
      @if colours.$purple-shade-10 != #ad547b { @error "Expected $purple-shade-10 to be #ad547b"; }
      @if colours.$purple-shade-20 != #9a4b6d { @error "Expected $purple-shade-20 to be #9a4b6d"; }
      @if colours.$purple-shade-30 != #87415f { @error "Expected $purple-shade-30 to be #87415f"; }
      @if colours.$purple-shade-40 != #733852 { @error "Expected $purple-shade-40 to be #733852"; }
      @if colours.$purple-shade-50 != #602f44 { @error "Expected $purple-shade-50 to be #602f44"; }
      @if colours.$purple-shade-60 != #4d2536 { @error "Expected $purple-shade-60 to be #4d2536"; }
      @if colours.$purple-shade-70 != #391c29 { @error "Expected $purple-shade-70 to be #391c29"; }
      @if colours.$purple-shade-80 != #26121b { @error "Expected $purple-shade-80 to be #26121b"; }
      @if colours.$purple-shade-90 != #13090d { @error "Expected $purple-shade-90 to be #13090d"; }
    `);
  });

  it("matches pink ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$pink-tint-90 != #fdf3f7 { @error "Expected $pink-tint-90 to be #fdf3f7"; }
      @if colours.$pink-tint-80 != #fbe7f0 { @error "Expected $pink-tint-80 to be #fbe7f0"; }
      @if colours.$pink-tint-70 != #f9dbe9 { @error "Expected $pink-tint-70 to be #f9dbe9"; }
      @if colours.$pink-tint-60 != #f7cfe2 { @error "Expected $pink-tint-60 to be #f7cfe2"; }
      @if colours.$pink-tint-50 != #f5c4db { @error "Expected $pink-tint-50 to be #f5c4db"; }
      @if colours.$pink-tint-40 != #f3b8d3 { @error "Expected $pink-tint-40 to be #f3b8d3"; }
      @if colours.$pink-tint-30 != #f1accc { @error "Expected $pink-tint-30 to be #f1accc"; }
      @if colours.$pink-tint-20 != #efa0c5 { @error "Expected $pink-tint-20 to be #efa0c5"; }
      @if colours.$pink-tint-10 != #ed94be { @error "Expected $pink-tint-10 to be #ed94be"; }
      @if colours.$pink-shade-10 != #d47ba4 { @error "Expected $pink-shade-10 to be #d47ba4"; }
      @if colours.$pink-shade-20 != #bc6d92 { @error "Expected $pink-shade-20 to be #bc6d92"; }
      @if colours.$pink-shade-30 != #a55f80 { @error "Expected $pink-shade-30 to be #a55f80"; }
      @if colours.$pink-shade-40 != #8d526d { @error "Expected $pink-shade-40 to be #8d526d"; }
      @if colours.$pink-shade-50 != #76445b { @error "Expected $pink-shade-50 to be #76445b"; }
      @if colours.$pink-shade-60 != #5e3649 { @error "Expected $pink-shade-60 to be #5e3649"; }
      @if colours.$pink-shade-70 != #462936 { @error "Expected $pink-shade-70 to be #462936"; }
      @if colours.$pink-shade-80 != #2f1b24 { @error "Expected $pink-shade-80 to be #2f1b24"; }
      @if colours.$pink-shade-90 != #170d12 { @error "Expected $pink-shade-90 to be #170d12"; }
    `);
  });

  it("matches red ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$red-tint-90 != #fbe6ed { @error "Expected $red-tint-90 to be #fbe6ed"; }
      @if colours.$red-tint-80 != #f8cedc { @error "Expected $red-tint-80 to be #f8cedc"; }
      @if colours.$red-tint-70 != #f4b5cb { @error "Expected $red-tint-70 to be #f4b5cb"; }
      @if colours.$red-tint-60 != #f19dba { @error "Expected $red-tint-60 to be #f19dba"; }
      @if colours.$red-tint-50 != #ee84a9 { @error "Expected $red-tint-50 to be #ee84a9"; }
      @if colours.$red-tint-40 != #ea6c98 { @error "Expected $red-tint-40 to be #ea6c98"; }
      @if colours.$red-tint-30 != #e75387 { @error "Expected $red-tint-30 to be #e75387"; }
      @if colours.$red-tint-20 != #e33b76 { @error "Expected $red-tint-20 to be #e33b76"; }
      @if colours.$red-tint-10 != #e02265 { @error "Expected $red-tint-10 to be #e02265"; }
      @if colours.$red-shade-10 != #c6094b { @error "Expected $red-shade-10 to be #c6094b"; }
      @if colours.$red-shade-20 != #b00843 { @error "Expected $red-shade-20 to be #b00843"; }
      @if colours.$red-shade-30 != #9a073a { @error "Expected $red-shade-30 to be #9a073a"; }
      @if colours.$red-shade-40 != #840632 { @error "Expected $red-shade-40 to be #840632"; }
      @if colours.$red-shade-50 != #6e052a { @error "Expected $red-shade-50 to be #6e052a"; }
      @if colours.$red-shade-60 != #580421 { @error "Expected $red-shade-60 to be #580421"; }
      @if colours.$red-shade-70 != #420319 { @error "Expected $red-shade-70 to be #420319"; }
      @if colours.$red-shade-80 != #2c0110 { @error "Expected $red-shade-80 to be #2c0110"; }
      @if colours.$red-shade-90 != #160008 { @error "Expected $red-shade-90 to be #160008"; }
    `);
  });

  it("matches orange ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$orange-tint-90 != #f8ece8 { @error "Expected $orange-tint-90 to be #f8ece8"; }
      @if colours.$orange-tint-80 != #f3ded6 { @error "Expected $orange-tint-80 to be #f3ded6"; }
      @if colours.$orange-tint-70 != #eed0c5 { @error "Expected $orange-tint-70 to be #eed0c5"; }
      @if colours.$orange-tint-60 != #e9c2b3 { @error "Expected $orange-tint-60 to be #e9c2b3"; }
      @if colours.$orange-tint-50 != #e5b4a1 { @error "Expected $orange-tint-50 to be #e5b4a1"; }
      @if colours.$orange-tint-40 != #e0a68f { @error "Expected $orange-tint-40 to be #e0a68f"; }
      @if colours.$orange-tint-30 != #db987e { @error "Expected $orange-tint-30 to be #db987e"; }
      @if colours.$orange-tint-20 != #e09272 { @error "Expected $orange-tint-20 to be #e09272"; }
      @if colours.$orange-tint-10 != #d68a6c { @error "Expected $orange-tint-10 to be #d68a6c"; }
      @if colours.$orange-shade-10 != #c37a60 { @error "Expected $orange-shade-10 to be #c37a60"; }
      @if colours.$orange-shade-20 != #ac6c56 { @error "Expected $orange-shade-20 to be #ac6c56"; }
      @if colours.$orange-shade-30 != #955e4b { @error "Expected $orange-shade-30 to be #955e4b"; }
      @if colours.$orange-shade-40 != #7e5040 { @error "Expected $orange-shade-40 to be #7e5040"; }
      @if colours.$orange-shade-50 != #684336 { @error "Expected $orange-shade-50 to be #684336"; }
      @if colours.$orange-shade-60 != #51352b { @error "Expected $orange-shade-60 to be #51352b"; }
      @if colours.$orange-shade-70 != #3a2720 { @error "Expected $orange-shade-70 to be #3a2720"; }
      @if colours.$orange-shade-80 != #231915 { @error "Expected $orange-shade-80 to be #231915"; }
      @if colours.$orange-shade-90 != #0d0c0b { @error "Expected $orange-shade-90 to be #0d0c0b"; }
    `);
  });

  it("matches yellow ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$yellow-tint-90 != #fffaf3 { @error "Expected $yellow-tint-90 to be #fffaf3"; }
      @if colours.$yellow-tint-80 != #fff5e7 { @error "Expected $yellow-tint-80 to be #fff5e7"; }
      @if colours.$yellow-tint-70 != #fff0dc { @error "Expected $yellow-tint-70 to be #fff0dc"; }
      @if colours.$yellow-tint-60 != #ffebd0 { @error "Expected $yellow-tint-60 to be #ffebd0"; }
      @if colours.$yellow-tint-50 != #ffe7c5 { @error "Expected $yellow-tint-50 to be #ffe7c5"; }
      @if colours.$yellow-tint-40 != #ffe2b9 { @error "Expected $yellow-tint-40 to be #ffe2b9"; }
      @if colours.$yellow-tint-30 != #ffddad { @error "Expected $yellow-tint-30 to be #ffddad"; }
      @if colours.$yellow-tint-20 != #ffd8a2 { @error "Expected $yellow-tint-20 to be #ffd8a2"; }
      @if colours.$yellow-tint-10 != #ffd396 { @error "Expected $yellow-tint-10 to be #ffd396"; }
      @if colours.$yellow-shade-10 != #e5ba7d { @error "Expected $yellow-shade-10 to be #e5ba7d"; }
      @if colours.$yellow-shade-20 != #cca56f { @error "Expected $yellow-shade-20 to be #cca56f"; }
      @if colours.$yellow-shade-30 != #b29061 { @error "Expected $yellow-shade-30 to be #b29061"; }
      @if colours.$yellow-shade-40 != #997c53 { @error "Expected $yellow-shade-40 to be #997c53"; }
      @if colours.$yellow-shade-50 != #7f6745 { @error "Expected $yellow-shade-50 to be #7f6745"; }
      @if colours.$yellow-shade-60 != #665237 { @error "Expected $yellow-shade-60 to be #665237"; }
      @if colours.$yellow-shade-70 != #4c3e29 { @error "Expected $yellow-shade-70 to be #4c3e29"; }
      @if colours.$yellow-shade-80 != #32291b { @error "Expected $yellow-shade-80 to be #32291b"; }
      @if colours.$yellow-shade-90 != #19140d { @error "Expected $yellow-shade-90 to be #19140d"; }
    `);
  });

  it("matches green ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$green-tint-90 != #e7f1ec { @error "Expected $green-tint-90 to be #e7f1ec"; }
      @if colours.$green-tint-80 != #cfe3da { @error "Expected $green-tint-80 to be #cfe3da"; }
      @if colours.$green-tint-70 != #b8d5c7 { @error "Expected $green-tint-70 to be #b8d5c7"; }
      @if colours.$green-tint-60 != #a0c8b5 { @error "Expected $green-tint-60 to be #a0c8b5"; }
      @if colours.$green-tint-50 != #89baa3 { @error "Expected $green-tint-50 to be #89baa3"; }
      @if colours.$green-tint-40 != #71ac90 { @error "Expected $green-tint-40 to be #71ac90"; }
      @if colours.$green-tint-30 != #599f7e { @error "Expected $green-tint-30 to be #599f7e"; }
      @if colours.$green-tint-20 != #42916b { @error "Expected $green-tint-20 to be #42916b"; }
      @if colours.$green-tint-10 != #2a8359 { @error "Expected $green-tint-10 to be #2a8359"; }
      @if colours.$green-shade-10 != #116a3f { @error "Expected $green-shade-10 to be #116a3f"; }
      @if colours.$green-shade-20 != #0f5e38 { @error "Expected $green-shade-20 to be #0f5e38"; }
      @if colours.$green-shade-30 != #0d5231 { @error "Expected $green-shade-30 to be #0d5231"; }
      @if colours.$green-shade-40 != #0b462a { @error "Expected $green-shade-40 to be #0b462a"; }
      @if colours.$green-shade-50 != #093b23 { @error "Expected $green-shade-50 to be #093b23"; }
      @if colours.$green-shade-60 != #072f1c { @error "Expected $green-shade-60 to be #072f1c"; }
      @if colours.$green-shade-70 != #052315 { @error "Expected $green-shade-70 to be #052315"; }
      @if colours.$green-shade-80 != #03170e { @error "Expected $green-shade-80 to be #03170e"; }
      @if colours.$green-shade-90 != #010b07 { @error "Expected $green-shade-90 to be #010b07"; }
    `);
  });

  it("matches teal ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$teal-tint-90 != #eef8f4 { @error "Expected $teal-tint-90 to be #eef8f4"; }
      @if colours.$teal-tint-80 != #def2e9 { @error "Expected $teal-tint-80 to be #def2e9"; }
      @if colours.$teal-tint-70 != #ceecdf { @error "Expected $teal-tint-70 to be #ceecdf"; }
      @if colours.$teal-tint-60 != #bee5d4 { @error "Expected $teal-tint-60 to be #bee5d4"; }
      @if colours.$teal-tint-50 != #aedfca { @error "Expected $teal-tint-50 to be #aedfca"; }
      @if colours.$teal-tint-40 != #9ed9bf { @error "Expected $teal-tint-40 to be #9ed9bf"; }
      @if colours.$teal-tint-30 != #8ed2b4 { @error "Expected $teal-tint-30 to be #8ed2b4"; }
      @if colours.$teal-tint-20 != #7eccaa { @error "Expected $teal-tint-20 to be #7eccaa"; }
      @if colours.$teal-tint-10 != #6ec69f { @error "Expected $teal-tint-10 to be #6ec69f"; }
      @if colours.$teal-shade-10 != #54ac86 { @error "Expected $teal-shade-10 to be #54ac86"; }
      @if colours.$teal-shade-20 != #4b9977 { @error "Expected $teal-shade-20 to be #4b9977"; }
      @if colours.$teal-shade-30 != #418668 { @error "Expected $teal-shade-30 to be #418668"; }
      @if colours.$teal-shade-40 != #387359 { @error "Expected $teal-shade-40 to be #387359"; }
      @if colours.$teal-shade-50 != #2f604a { @error "Expected $teal-shade-50 to be #2f604a"; }
      @if colours.$teal-shade-60 != #254c3b { @error "Expected $teal-shade-60 to be #254c3b"; }
      @if colours.$teal-shade-70 != #1c392c { @error "Expected $teal-shade-70 to be #1c392c"; }
      @if colours.$teal-shade-80 != #12261d { @error "Expected $teal-shade-80 to be #12261d"; }
      @if colours.$teal-shade-90 != #09130e { @error "Expected $teal-shade-90 to be #09130e"; }
    `);
  });

  it("matches cyan ramp exactly", () => {
    expectSassAssertionsPass(`
      @if colours.$cyan-tint-90 != #f0f8fb { @error "Expected $cyan-tint-90 to be #f0f8fb"; }
      @if colours.$cyan-tint-80 != #e1f1f7 { @error "Expected $cyan-tint-80 to be #e1f1f7"; }
      @if colours.$cyan-tint-70 != #d2eaf3 { @error "Expected $cyan-tint-70 to be #d2eaf3"; }
      @if colours.$cyan-tint-60 != #c3e4f0 { @error "Expected $cyan-tint-60 to be #c3e4f0"; }
      @if colours.$cyan-tint-50 != #b5ddec { @error "Expected $cyan-tint-50 to be #b5ddec"; }
      @if colours.$cyan-tint-40 != #a6d6e8 { @error "Expected $cyan-tint-40 to be #a6d6e8"; }
      @if colours.$cyan-tint-30 != #97d0e5 { @error "Expected $cyan-tint-30 to be #97d0e5"; }
      @if colours.$cyan-tint-20 != #88c9e1 { @error "Expected $cyan-tint-20 to be #88c9e1"; }
      @if colours.$cyan-tint-10 != #79c2dd { @error "Expected $cyan-tint-10 to be #79c2dd"; }
      @if colours.$cyan-shade-10 != #60a9c4 { @error "Expected $cyan-shade-10 to be #60a9c4"; }
      @if colours.$cyan-shade-20 != #5596ae { @error "Expected $cyan-shade-20 to be #5596ae"; }
      @if colours.$cyan-shade-30 != #4a8398 { @error "Expected $cyan-shade-30 to be #4a8398"; }
      @if colours.$cyan-shade-40 != #407082 { @error "Expected $cyan-shade-40 to be #407082"; }
      @if colours.$cyan-shade-50 != #355e6d { @error "Expected $cyan-shade-50 to be #355e6d"; }
      @if colours.$cyan-shade-60 != #2a4b57 { @error "Expected $cyan-shade-60 to be #2a4b57"; }
      @if colours.$cyan-shade-70 != #203841 { @error "Expected $cyan-shade-70 to be #203841"; }
      @if colours.$cyan-shade-80 != #15252b { @error "Expected $cyan-shade-80 to be #15252b"; }
      @if colours.$cyan-shade-90 != #0a1215 { @error "Expected $cyan-shade-90 to be #0a1215"; }
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
