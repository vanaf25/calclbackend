import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalculationDocument, Calculator } from './schemas/calculation.schema';
import { entryPointDto } from './dto/calculation.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Calculator.name)
    private itemModel: Model<CalculationDocument>,
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
    const createdItem = new this.itemModel({
      ZSQ,
      DEQ,
      GBQ,
      DFQ: T,
      DBQ: B,
      DSQ: M,
    });
    return createdItem.save();
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
    const S4 = S2 + S3 + 2;
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
  async getItems() {
    return this.itemModel.find().exec();
  }
}
