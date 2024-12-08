import { Injectable } from "@nestjs/common";
import { entryPointDto } from "./dto/calculation.dto";

@Injectable()
export class AppService {
  constructor(
  ) {}
  async calculate(data: entryPointDto) {
    const L = +data.L;
    const O = +data.O;
    const D = +data.D;
    //Flasing Quanity;
    //const J= L / 10
    //Downspout Section Quantity
    const M1 = O * D;
    const M2 = Math.round(M1);
    const M = M2 / 10;
    //Downspout Bracket Quantity
    const B = Math.round(M * 2.2);
    //Downspout Fastener Quantity
    const T = B * 4;
    //Gutter Bracket Quantity
    const GBQ = L / 1.3;
    // Downspout Extension Quantity
    const DEQ = Math.round((O * 2) / 10);
    //Zip Screw Quantity
    const ZSQ = M * 12 + L + T;
    return {
      ZSQ,
      DEQ,
      GBQ,
      DFQ: T,
      DBQ: B,
      DSQ: M,
    };
  }
  /*async create(calculation: CreateCalculationDto) {
    const createdItem = new this.itemModel(calculation);
    return createdItem.save();
  }*/
  async wallCalculator({ L, M, O, G, H }) {
    const B = L * 12;

    // Wall Width
    //const C = W * 12;

    // Stud Total Quantity
    const S1 = B / M;
    const S2 = Math.round(S1);
    const S3 = O * 2;
    const S4 = S2 + S3;
    const S = S4 + 2;
    // Sole Plate Quantity
    //const Y1 = L / P;
    //const Y = Math.ceil(Y1);

    // Wall Top Plate Quantity
    //const V1 = L / P;
    //const V = V1 * 2;

    // Wall Window Plate Length
    const T1 = G * O;
    const T2 = T1 / 12;
    const T = Math.round(T2);
    console.log("T:", T);
    // Wall Window Plate Quantity
    //const R = T / P;

    // Wall Plate Total Quantity
    //const N = V + R;

    // Door & Window Header Length
    const K1 = H + G;
    const K2 = K1 / 12;
    const K = Math.round(K2);

    // Header Total Quantity
    //const J1 = K / P;
    //const J = J1 * 2;

    // Stud Fastener Quantity
    const X1 = S * 4;
    const StudFastenerQuantity = X1 + 12;
    // Sole Plate Fastener Quantity
    const X1Sole = B / 28;
    const SolePlateFastenerQuantity = Math.round(X1Sole);
    // Wall Plate Fastener Quantity
    const X1Wall = L + T;
    const WallPlateFastenerQuantity = X1Wall * 2;
    console.log("wall: ", WallPlateFastenerQuantity);
    const HeaderNailQuantity = K * 3;
    return {
      HeaderNailQuantity,
      WallPlateFastenerQuantity,
      SolePlateFastenerQuantity,
      StudFastenerQuantity,
    };
  }
  async hotTubPad({ L, W, S, C }) {
    function calculateLumberTotalLength(L, W, S) {
      const X1 = L * 2;
      const X2 = W * 2;
      const X3 = X1 * X2;
      const X4 = X3 / S;
      return Math.round(X4);
    }
    // Function to calculate Spike Total Quantity
    function calculateSpikeTotalQuantity(L, W) {
      const X1 = L * 2;
      const X2 = W * 2;
      const X3 = X1 * X2;
      return Math.round(X3);
    }
    // Function to calculate Gravel Fill Total Quantity in Cubic Feet
    function calculateGravelFillTotalQuantity(L, W) {
      const X1 = L * W;
      const X2 = X1 * 0.5;
      return Math.round(X2);
    }
    // Function to calculate Ground Cloth Total Quantity in Square Feet
    function calculateGroundClothTotalQuantity(L, W, C) {
      const X1 = L * W;
      const X2 = X1 / C;
      return Math.round(X2);
    }
    return {
      LumberTotalLength: calculateLumberTotalLength(L, W, S),
      SpikeTotalQuantity: calculateSpikeTotalQuantity(L, W),
      GravelFillTotalQuantityCF: calculateGravelFillTotalQuantity(L, W),
      GroundClothTotalQuantitySF: calculateGroundClothTotalQuantity(L, W, C),
    };
  }
  async laticalPanel({ L, W }) {
    function calculateLatticePanelTotalQuantity(L, W) {
      const B1 = L * W;
      const B2 = B1 / 32;
      return Math.round(B2);
    }
    const calculateLatticePanelTrimTotalQuantity = (B) => B * 4;
    const calculateLatticePanelScrewTotalQuantity = (B) => B * 16;
    const latticePanelTotal = calculateLatticePanelTotalQuantity(L, W);
    const latticePanelTrimTotal =
      calculateLatticePanelTrimTotalQuantity(latticePanelTotal);
    const latticePanelScrewTotal =
      calculateLatticePanelScrewTotalQuantity(latticePanelTotal);
    return {
      LatticePanelTrimTotalQuantity: latticePanelTrimTotal,
      LatticePanelScrewTotalQuantity: latticePanelScrewTotal,
    };
  }
  async homeWrap({ A, B, L, M }) {
    function calculateThermoplasticWrapRollTotalQuantity(A, B) {
      const X1 = A * B;
      const X2 = X1 / 1350;
      return Math.round(X2);
    }
    function calculateOSBSheathingTotalQuantity(A, B) {
      const S1 = A * B;
      const S2 = S1 / 32;
      return Math.round(S2);
    }
    function calculateOSBSheathingNailTotalQuantity(S) {
      return S * 24;
    }
    function calculatePaintNewSidingTotalQuantity(A, B) {
      const X1 = A * B;
      const X2 = X1 / 175;
      return Math.round(X2);
    }
    function calculatePaintExistingSidingTotalQuantity(A, B) {
      const X1 = A * B;
      const X2 = X1 / 320;
      return Math.round(X2);
    }
    function calculatePaintTrimTotalQuantity(L, M) {
      const X1 = L * M;
      const X2 = X1 / 3840;
      const X3 = X2 * 12;
      return Math.round(X3);
    }
    const osbSheathingTotal = calculateOSBSheathingTotalQuantity(A, B);
    return {
      ThermoplasticWrapRollQuantity:
        calculateThermoplasticWrapRollTotalQuantity(A, B),
      OSBSheathingNailQuantity:
        calculateOSBSheathingNailTotalQuantity(osbSheathingTotal),
      PaintNewSidingBareQuantity: calculatePaintNewSidingTotalQuantity(A, B),
      PaintExistingSidingBareQuantity:
        calculatePaintExistingSidingTotalQuantity(A, B),
      PaintTrimQuantity: calculatePaintTrimTotalQuantity(L, M),
    };
  }
  async vinylSiding({ A, B, M, N }) {
    // Step 1: Vinyl Siding 12" Coverage Total Quantity
    const X1_Siding12Inch = A / 16;
    const X2_Siding12Inch = X1_Siding12Inch * B;
    const Siding12InchCoverageQuantity = Math.round(X2_Siding12Inch);

    // Step 2: Vinyl Siding Variable Coverage Total Quantity
    const X1_SidingVariable = A / 16;
    const X2_SidingVariable = B * 12;
    const X3_SidingVariable = X2_SidingVariable / M;
    const X4_SidingVariable = X1_SidingVariable * X3_SidingVariable;
    const SidingVariableCoverageQuantity = Math.round(X4_SidingVariable);

    // Step 3: Vinyl Starter/Frieze Trim 12' Length Total Quantity
    const X1_StarterFrieze12ft = A / 12;
    const StarterFriezeTrim12ftQuantity = Math.round(X1_StarterFrieze12ft);

    // Step 4: Vinyl Starter/Frieze Trim Variable Length Total Quantity
    const X1_StarterFriezeVariable = A / N;
    const StarterFriezeTrimVariableQuantity = Math.round(
      X1_StarterFriezeVariable,
    ); // Round up
    return {
      Siding12InchCoverageQuantity,
      SidingVariableCoverageQuantity,
      StarterFriezeTrim12ftQuantity,
      StarterFriezeTrimVariableQuantity,
    };
  }
  async corners({ H, Q, S }) {
    // Step 1: Inside Corner Total Quantity
    const X1_Inside = H / 12;
    const X2_Inside = X1_Inside * Q;
    const InsideCornerQuantity = Math.round(X2_Inside);
    // Step 2: Outside Corner Wood Total Quantity
    const X1_OutsideWood = H / 12;
    const X2_OutsideWood = X1_OutsideWood * Q;
    const X3_OutsideWood = Math.round(X2_OutsideWood);
    const OutsideCornerWoodQuantity = X3_OutsideWood * 2;
    // Step 3: Outside Corner Vinyl/Prefab Total Quantity
    const X1_OutsideVinyl = H / S;
    const X2_OutsideVinyl = X1_OutsideVinyl * Q;
    const OutsideCornerVinylPrefabQuantity = Math.round(X2_OutsideVinyl);
    return {
      InsideCornerQuantity,
      OutsideCornerWoodQuantity,
      OutsideCornerVinylPrefabQuantity,
    };
  }
  async sheetSiding({ A, B }) {
    function calculateWallArea(A, B) {
      return A * B;
    }
    function calculateSidingPanel4x8Quantity(A, B) {
      const X1 = A * B;
      const X2 = X1 / 32;
      return Math.round(X2);
    }
    function calculateSidingPanel4x10Quantity(A, B) {
      const X1 = A * B;
      const X2 = X1 / 40;
      return Math.round(X2);
    }
    return {
      WallAreaSF: calculateWallArea(A, B),
      SidingPanel4x8Quantity: calculateSidingPanel4x8Quantity(A, B),
      SidingPanel4x10Quantity: calculateSidingPanel4x10Quantity(A, B),
    };
  }
  async soffit({ A, L, M }) {
    const calculateSoffitWoodHBTotal = (A, L) => Math.round(A / L);
    function calculateSoffitHBendTotal(A, L, M) {
      const X1 = L * 12;
      const X2 = X1 / M;
      const X3 = A / X2;
      return Math.round(X3);
    }
    function calculateSoffitVinylAlTotal(A, L, M) {
      const X1 = L * 12;
      const X2 = X1 / M;
      const X3 = A / X2;
      return Math.round(X3);
    }
    function calculateSoffitNailTotal(A) {
      return Math.round(A * 4);
    }
    function calculateSoffitCaulkTotal(A) {
      return Math.round(A / 28);
    }
    function calculateSoffitPaintTotal(A, M) {
      const X1 = A * 12;
      const X2 = X1 * M;
      const X3 = X2 * 12;
      const X4 = X3 / 320;
      return Math.round(X4);
    }
    return {
      SoffitTotalWoodHB: calculateSoffitWoodHBTotal(A, L),
      HBendTotal: calculateSoffitHBendTotal(A, L, M),
      SoffitTotalVinylAl: calculateSoffitVinylAlTotal(A, L, M),
      SoffitJChannelTotal: calculateSoffitWoodHBTotal(A, L),
      SoffitNail: calculateSoffitNailTotal(A),
      SoffitCaulk: calculateSoffitCaulkTotal(A),
      SoffitPaint: calculateSoffitPaintTotal(A, M),
    };
  }
  async pergolaShade({ L, W, A, B, D }) {
    // Pergola Impervious Polycarbonate Total Quantity
    const X1_polycarbonate = L / B;
    const X2_polycarbonate = W / A;
    const X3_polycarbonate = X1_polycarbonate * X2_polycarbonate;
    const imperviousPolycarbonateTotal = Math.round(X3_polycarbonate); // Round up
    // Pergola Edge Cover Total Quantity
    const X1_edgeCover = L * 2;
    const X2_edgeCover = W * 2;
    const edgeCoverTotal = X1_edgeCover + X2_edgeCover;
    // Pergola Seam Cover Total Quantity
    const X1_seamCover = L / B;
    const X2_seamCover = W / D;
    const X3_seamCover = X1_seamCover * X2_seamCover;
    const seamCoverTotal = Math.ceil(X3_seamCover); // Round up
    // Pergola Screw Total Quantity
    const screwTotal = L * W;
    // Return the calculated values in an object matching the result array keys
    return {
      ImperviousPolycarbonateQuantity: imperviousPolycarbonateTotal,
      EdgeCoverQuantity: edgeCoverTotal,
      SeamCoverQuantity: seamCoverTotal,
      ScrewQuantity: screwTotal,
    };
  }
  async friezeBoard({ A, L }) {
    const Q1 = A / L;
    const Q = Math.round(Q1);
    const X1_nail = L * 4;
    const X2_nail = X1_nail / 3;
    const X3_nail = X2_nail * Q;
    const nailTotal = Math.round(X3_nail);
    return {
      FriezeBoardNailTotalQuantity: nailTotal,
    };
  }
  async plankSiding({ A, B, R }) {
    // Wall Height LI (inches)
    const wallHeightLI = Math.round(B * 12);
    // Wall Area SF
    const wallAreaSF = A * B;
    // Planks Per Row Quantity
    const planksPerRowQuantity = Math.round(A / 12);
    // Rows Per Wall with 4" Reveal
    const rowsPerWall4InchReveal = Math.round((B * 12) / 4);
    // Rows Per Wall with 7" Reveal
    const rowsPerWall7InchReveal = Math.round((B * 12) / 7);
    // Rows Per Wall with 10.5" Reveal
    const rowsPerWall10_5InchReveal = Math.round((B * 12) / 10.5);
    // Plank Total Quantity
    const X1 = B * 12;
    const X2 = X1 / R;
    const X3 = A / 12;
    const plankTotalQuantity = Math.round(X2 * X3);
    // Return the calculated values in the correct format
    return {
      WallHeight: wallHeightLI,
      WallArea: wallAreaSF,
      PlanksPerRowQuantity: planksPerRowQuantity,
      RowsPerWall4InchRevealQuantity: rowsPerWall4InchReveal,
      RowsPerWall7InchRevealQuantity: rowsPerWall7InchReveal,
      RowsPerWall10_5InchRevealQuantity: rowsPerWall10_5InchReveal,
      PlankTotalQuantity: plankTotalQuantity,
    };
  }
  async fascia({ A, M, S }) {
    // Step 1: Fascia Total Quantity
    const fasciaTotalQuantity = Math.round(A / 12);
    // Step 2: Fascia Paint Total Quantity (Gallons)
    const fasciaPaintX1 = S * 12;
    const fasciaPaintX2 = fasciaPaintX1 * A;
    const fasciaPaintX3 = fasciaPaintX2 / 320;
    const fasciaPaintTotalQuantity = Math.round(fasciaPaintX3);
    // Step 3: Fascia Caulk Tube Total Quantity
    const fasciaCaulkX1 = A * 2;
    const fasciaCaulkX2 = M / 12;
    const fasciaCaulkX3 = fasciaCaulkX2 * 2;
    const fasciaCaulkX4 = fasciaCaulkX1 + fasciaCaulkX3;
    const fasciaCaulkX5 = fasciaCaulkX4 / 56;
    const fasciaCaulkTotalQuantity = Math.round(fasciaCaulkX5 * 100) / 100;
    // Step 4: Fascia Nails Total Quantity
    const fasciaNailsX1 = A * 12;
    const fasciaNailsX2 = fasciaNailsX1 / 16;
    const fasciaNailsX3 = fasciaNailsX2 * 2;
    const fasciaNailsTotalQuantity = Math.round(fasciaNailsX3);
    return {
      FasciaTotalQuantity: fasciaTotalQuantity,
      FasciaPaintQuantity: fasciaPaintTotalQuantity,
      FasciaCaulkQuantity: fasciaCaulkTotalQuantity,
      FasciaNailsQuantity: fasciaNailsTotalQuantity,
    };
  }
  async stuccoWallCovering({ L, W, T }) {
    function calculateBasecoat80lb(L, W, T) {
      const X1 = L * W;
      const X2 = X1 / T;
      return Math.round(X2);
    }
    function calculateTopcoat80lb(L, W) {
      const X1 = L * W;
      const X2 = X1 / 65;
      return Math.round(X2);
    }
    function calculateFastenerQuantity(L, W) {
      const X1 = L * W;
      return Math.round(X1);
    }
    function calculateSealerQuantity(L, W) {
      const X1 = L * W;
      const X2 = X1 / 100;
      return Math.round(X2);
    }
    function calculatePaintAndSealerQuantity(L, W) {
      const X1 = L * W;
      const X2 = X1 / 125;
      return Math.round(X2);
    }
    return {
      Basecoat80lbQuantity: calculateBasecoat80lb(L, W, T),
      Topcoat80lbQuantity: calculateTopcoat80lb(L, W),
      Fastener1inQuantity: calculateFastenerQuantity(L, W),
      SealerQuantity: calculateSealerQuantity(L, W),
      PaintAndSealerQuantity: calculatePaintAndSealerQuantity(L, W),
    };
  }
  async brickWallCovering({ L, W, S }) {
    function calculateA(L) {
      return L * 12;
    }
    function calculateCinderBlockQuantity(A, B) {
      const X1 = A * B;
      return Math.round(X1 / 128);
    }
    function calculateBrickQuantity(A, B, S) {
      const X1 = A * B;
      return Math.round(X1 / S);
    }
    function calculateBrickMortarQuantity(L, W) {
      const X1 = L * W;
      return Math.round(X1 / 28);
    }
    function calculateCinderBlockMortarQuantity(L, W) {
      const X1 = L * W;
      return Math.round(X1 / 9);
    }
    function calculateSealerQuantity(L, W) {
      const X1 = L * W;
      return Math.round(X1 / 200);
    }
    const A = calculateA(L);
    const B = calculateA(W);
    return {
      CinderBlockQuantity: calculateCinderBlockQuantity(A, B),
      BrickQuantity: calculateBrickQuantity(A, B, S),
      BrickMortarQuantity: calculateBrickMortarQuantity(L, W),
      CinderBlockMortarQuantity: calculateCinderBlockMortarQuantity(L, W),
      SealerQuantity: calculateSealerQuantity(L, W),
    };
  }
  async porchCeiling({ A, W, L, M }) {
    function calculatePorchCeilingSheathing4x8(A, W) {
      const X1 = A * W;
      const X2 = X1 / 32;
      return Math.round(X2);
    }
    function calculatePorchCeilingSheathing4x10(A, W) {
      const X1 = A * W;
      const X2 = X1 / 40;
      return Math.round(X2);
    }
    function calculatePorchCeilingJChannel(A, W, L) {
      const X1 = A * 2;
      const X2 = W * 2;
      const X3 = X1 + X2;
      const X4 = X3 / L;
      return Math.round(X4);
    }
    function calculateHBend4x8Sheathing(A, W) {
      const X1 = A * W;
      const X2 = X1 / 32;
      const X3 = X2 / 12;
      return Math.round(X3);
    }
    function calculateHBend4x10Sheathing(A, W) {
      const X1 = A * W;
      const X2 = X1 / 40;
      const X3 = X2 / 14;
      return Math.round(X3);
    }
    function calculatePorchCeilingPaint(A, W) {
      const X1 = A * W;
      const X2 = X1 / 320;
      return Math.round(X2);
    }
    function calculatePorchCeilingSoffitPiece(A, W, M) {
      const X1 = W * 12;
      const X2 = X1 / M;
      const X3 = A / 12;
      const X4 = X2 * X3;
      return Math.round(X4);
    }
    return {
      Sheathing4x8Quantity: calculatePorchCeilingSheathing4x8(A, W),
      Sheathing4x10Quantity: calculatePorchCeilingSheathing4x10(A, W),
      JChannelQuantity: calculatePorchCeilingJChannel(A, W, L),
      HBend4x8SheathingQuantity: calculateHBend4x8Sheathing(A, W),
      HBend4x10SheathingQuantity: calculateHBend4x10Sheathing(A, W),
      CeilingPaintQuantity: calculatePorchCeilingPaint(A, W),
      SoffitPieceQuantity: calculatePorchCeilingSoffitPiece(A, W, M),
    };
  }
  async starFraming({ L, P, A, M, J, F, Z }) {
    const B = L * 12; // Stairs Length LI in inches
    const C = L * 12; // Stairs Width LI in inches
    // Stringer Total Quantity
    const S1 = C / 12;
    const S2 = Math.round(S1);
    const S3 = B / P;
    const S4 = Math.round(S3);
    const S = S2 * S4;
    // Tread Total Quantity
    const E1 = B / 7;
    const E = Math.round(E1);
    // Step Area SI
    const K = C * M;
    // Board Area SI
    const D = P * A;
    // Step Material Total Quantity
    const Q1 = K / D;
    const Q2 = Math.round(Q1);
    const Q = Q2 * E;
    console.log(Q);
    // Riser Area SI
    const Y = C * J;
    // Riser Material Total Quantity
    const N1 = Y / D;
    const N2 = Math.ceil(N1);
    const N = N2 * Z;
    console.log(N);
    // Stringer Joist Hanger Total Quantity
    const StringerJoistHangerTotal = S;
    // Stringer Joist Hanger Nail Total Quantity
    const StringerJoistHangerNailTotal = S * 12;
    // Tread Fastener Total Quantity
    const TreadFastenerTotal = K * S * 4;
    // Riser Fastener Total Quantity
    const RiserFastenerTotal = Z * S * 2;
    // Skirting Both Sides Total Quantity
    const SkirtingBothSidesTotal = B * F;
    // Skirting One Side Total Quantity
    const SkirtingOneSideTotal = (B * F) / 2;
    return {
      StringerJoistHangerQuantity: StringerJoistHangerTotal,
      StringerJoistHangerNailQuantity: StringerJoistHangerNailTotal,
      TreadFastenerQuantity: TreadFastenerTotal,
      RiserFastenerQuantity: RiserFastenerTotal,
      SkirtingBothSidesArea: SkirtingBothSidesTotal,
      SkirtingOneSideArea: SkirtingOneSideTotal,
    };
  }
  async fencing({ L, C, B }) {
    const result: any = {};
    const D = C * 6;
    const F = L / 8;
    // Helper function to round to nearest whole number
    const round = (value) => Math.round(value);
    // Cement 80lb Bag, Standard Panel, Standard Post, Picket Half Post, and Metal Post Cap Total Quantity
    const calculateByDividing8 = (length) => round(length / 8);
    const F1 = calculateByDividing8(L);
    result.cementTotal = F1;
    result.standardPanelTotal = F1;
    result.standardPostTotal = F1;
    result.picketHalfPostTotal = F1;
    result.picketMetalPostCapTotal = F1;
    // Vertical Picket Total Quantity
    const verticalPicketX1 = L * 12;
    const verticalPicketX2 = verticalPicketX1 / 5.5;
    result.verticalPicketTotal = round(verticalPicketX2 * 12);
    // Picket Rail Total Quantity
    result.picketRailTotal = round((L / 16) * 3);
    // Picket Post Adapter Quantity
    result.picketPostAdapterTotal = round((L / 8) * 3);
    // Chain Link Fence Length LI
    result.chainLinkLength = L * 12;
    // Chain Link Tension Band, Brace Band, and Rail End Total Quantities
    result.chainLinkTensionBandTotal = C * 6;
    result.chainLinkBraceBandTotal = C * 2;
    result.chainLinkRailEndTotal = C * 4 + 4;
    // Chain Link Bolt, Gate Clip, Gate Post Hinge, Gate Frame Hinge, Fork Latch Kit Quantities
    result.chainLinkBoltTotal = B * 2;
    result.chainLinkGateClipTotal = B * 6;
    result.chainLinkGatePostHingeTotal = B * 2;
    result.chainLinkGateFrameHingeTotal = B * 2;
    result.chainLinkForkLatchKitTotal = B;
    // Chain Link 1 1/4" Bolt Total Quantity
    result.chainLinkBolt1_25Total = D;
    // Chain Link Line Post Total Quantity
    result.chainLinkLinePostTotal = round(L / 8);
    // Chain Link Fabric Roll Total Quantity
    result.chainLinkFabricRollTotal = round(L / 72);
    // Chain Link Fence Tie Total Quantity
    const fenceTieX1 = L / 2;
    const fenceTieX2 = C * 6;
    const fenceTieX3 = F * 6;
    const fenceTieX4 = fenceTieX1 + fenceTieX2;
    result.chainLinkFenceTieTotal = fenceTieX4 + fenceTieX3;
    // Chain Link Line Post Eye Top Total Quantity
    result.chainLinkLinePostEyeTopTotal = F;
    // Chain Link Panel Clamp, Hog Ring, and Top Rail Sleeve Connector Quantities
    result.chainLinkPanelClampTotal = round(L / 6);
    result.chainLinkHogRingTotal = round(L / 2);
    result.chainLinkTopRailSleeveConnectorTotal = round(L / 10);
    // Chain Link Corner Post Plug Cap and Corner/End Post Quantities
    result.chainLinkCornerPostPlugCapTotal = C;
    result.chainLinkCornerEndPostTotal = C + 2;
    // Chain Link Top Rail Total Quantity
    result.chainLinkTopRailTotal = round(L / 10);
    // Chain Link Fabric Bar Total Quantity
    result.chainLinkFabricBarTotal = C + 2;
    return result;
  }
  async getItems() {
    return [];
  }
}
