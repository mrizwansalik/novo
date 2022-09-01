export const brokerageId = {
  prospects: {
    prospectId: {
      dashboard: {
        value:
          "/dashboard/brokerage/:brokerageId/prospects/:prospectId/dashboard",
        getValue: (brokerageId, prospectId) =>
          `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/dashboard`,
      },
      plans: {
        selfFunded: {
          documents: {
            value:
              "/dashboard/brokerage/:brokerageId/prospects/:prospectId/plans/self-funded/documents",
            getValue: (brokerageId, prospectId) =>
              `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/plans/self-funded/documents`,
          },
          stopLoss: {
            value:
              "/dashboard/brokerage/:brokerageId/prospects/:prospectId/plans/self-funded/stop-loss",
            getValue: (brokerageId, prospectId) =>
              `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/plans/self-funded/stop-loss`,
          },
          design: {
            value:
              "/dashboard/brokerage/:brokerageId/prospects/:prospectId/plans/self-funded/design/:planId?",
            getValue: (brokerageId, prospectId, planId = "") =>
              `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/plans/self-funded/design/${planId}`,
          },
          participation: {
            value:
              "/dashboard/brokerage/:brokerageId/prospects/:prospectId/plans/self-funded/participation",
            getValue: (brokerageId, prospectId) =>
              `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/plans/self-funded/participation`,
          },
        },
        fullyInsured: {
          documents: {
            value:
              "/dashboard/brokerage/:brokerageId/prospects/:prospectId/plans/fully-insured/documents",
            getValue: (brokerageId, prospectId) =>
              `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/plans/fully-insured/documents`,
          },
          design: {
            value:
              "/dashboard/brokerage/:brokerageId/prospects/:prospectId/plans/fully-insured/design/:planId?",
            getValue: (brokerageId, prospectId, planId) =>
              `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/plans/fully-insured/design/${planId}`,
          },
          participation: {
            value:
              "/dashboard/brokerage/:brokerageId/prospects/:prospectId/plans/fully-insured/participation",
            getValue: (brokerageId, prospectId) =>
              `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/plans/fully-insured/participation`,
          },
        },
      },
      rfps: {
        rfpList: {
          value:
            "/dashboard/brokerage/:brokerageId/prospects/:prospectId/rfps/list",
          getValue: (brokerageId, prospectId) =>
            `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/rfps/list`,
        },
        proposalRequest: {
          value:
            "/dashboard/brokerage/:brokerageId/prospects/:prospectId/rfps/add",
          getValue: (brokerageId, prospectId) =>
            `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/rfps/add`,
        },
        proposalRequestUpdate: {
          value:
            "/dashboard/brokerage/:brokerageId/prospects/:prospectId/rfps/:rfpId/update",
          getValue: (brokerageId, prospectId, rfpId) =>
            `/dashboard/brokerage/${brokerageId}/prospects/${prospectId}/rfps/${rfpId}/update`,
        },
      },
    },
    org: {
      prospectId: {
        recipe: {
          recipeId: {
            network: {
              value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/network`,
              getValue: (brokerageId, prospectId, recipeId) =>
                `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/network`,
            },
            pharmacyBenefitManager: {
              value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/pharmacy-benefit-manager`,
              getValue: (brokerageId, prospectId, recipeId) =>
                `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/pharmacy-benefit-manager`,
            },
            costContainmentVendors: {
              value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/cost-containment-vendors`,
              getValue: (brokerageId, prospectId, recipeId) =>
                `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/cost-containment-vendors`,
            },
            tpa: {
              value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/tpa`,
              getValue: (brokerageId, prospectId, recipeId) =>
                `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/tpa`,
            },
            plansets: {
              value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/plansets/:planSetId?`,
              getValue: (brokerageId, prospectId, recipeId, planSetId) =>
                `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/plansets/${planSetId}`,
              plans: {
                value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/plansets/:planSetId/plans/:planId?`,
                getValue: (
                  brokerageId,
                  prospectId,
                  recipeId,
                  planSetId,
                  planId
                ) =>
                  `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/plansets/${planSetId}/plans/${planId}`,
              },
            },
            expenses: {
              value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/expenses`,
              getValue: (brokerageId, prospectId, recipeId) =>
                `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/expenses`,
            },
            stopLoss: {
              value: `/dashboard/brokerage/:brokerageId/prospects/org/:prospectId/recipe/:recipeId/stop-loss/:stopLossId?`,
              getValue: (brokerageId, prospectId, recipeId, stopLossId = "") =>
                `/dashboard/brokerage/${brokerageId}/prospects/org/${prospectId}/recipe/${recipeId}/stop-loss/${stopLossId}`,
            },
          },
        },
      },
    },
  },
};
