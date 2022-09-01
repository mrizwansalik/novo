import { brokerageId } from "./brokerageId";

const routes = {
  value: "/",
  login: {
    value: "/login",
    forgetPassword: {
      value: "/login/forget-password",
    },
  },

  signup: {
    value: "/signup/org/:orgId",
    getValue: (orgId: string) => `/signup/org/${orgId}`,
  },
  goscreen: {
    value: "/signup/setup/:orgId",
    getValue: (orgId: string) => `/signup/setup/${orgId}`,
  },

  setpassword: {
    value: "/dashboard/worker/phq/setPassword",
  },
  contactinfo: {
    value: "/dashboard/worker/phq/personal/section",
  },

  employeecontactform: {
    value: "/dashboard/worker/phq/personal/contact-details",
  },

  employeestatusform: {
    value: "/dashboard/worker/phq/personal/status",
  },

  employeeposition: {
    value: "/dashboard/worker/phq/position",
  },

  waiving: {
    value: "/dashboard/worker/phq/waiving",
  },
  dependentsintro: {
    value: "/dashboard/worker/phq/dependentsintro",
  },

  dependents: {
    value: "/dashboard/worker/phq/dependents",
  },
  editdependents: {
    value: "/dashboard/worker/phq/dependents/:dependentId/edit",
    getValue: (dependentId: string) =>
      `/dashboard/worker/phq/dependents/${dependentId}/edit`,
  },
  adddependents: {
    value: "/dashboard/worker/phq/adddependents",
  },

  acknowledge: {
    value: "/dashboard/worker/phq/acknowledge",
  },

  socialsecurity: {
    value: "/dashboard/worker/phq/socialsecurity",
  },

  highfive: {
    value: "/dashboard/worker/phq/highfive",
  },

  bodymeasurement: {
    value: "/dashboard/worker/phq/medical/section/bodymeasurement",
  },

  loginverified: {
    value: "/signup/verified",
  },

  dashboard: {
    value: "/dashboard",
    god: {
      brokerages: {
        value: "/dashboard/god/brokerages",
        list: {
          value: "/dashboard/god/brokerages/list",
        },
        add: {
          value: "/dashboard/god/brokerages/add",
        },
        prospects: {
          dashboard: {
            value: (brokerageId: string, prospectId: string) =>
              `/dashboard/god/brokerages/${brokerageId}/prospects/${prospectId}/dashboard`,
          },

          onboarding: {
            programBuild: {
              recipe: {
                network: {
                  value: (
                    orgId: string,
                    prospectId: string,
                    recipeId: string
                  ) =>
                    `/dashboard/god/brokerage/${orgId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/network`,
                },
                pharmacyBenefitManager: {
                  value: (
                    orgId: string,
                    prospectId: string,
                    recipeId: string
                  ) =>
                    `/dashboard/god/brokerage/${orgId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/pharmacy-benefit-manager`,
                },
                costContainmentVendors: {
                  value: (
                    orgId: string,
                    prospectId: string,
                    recipeId: string
                  ) =>
                    `/dashboard/god/brokerage/${orgId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/cost-containment-vendors`,
                },
                tpa: {
                  value:
                    "/dashboard/god/brokerage/:brokerageId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/tpa",
                  getValue: (
                    orgId: string,
                    prospectId: string,
                    recipeId: string
                  ) =>
                    `/dashboard/god/brokerage/${orgId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/tpa`,
                },
                plansets: {
                  value:
                    "/dashboard/god/brokerage/:brokerageId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/plansets/:planSetId?",
                  getValue: (
                    brokerageId: string,
                    prospectId: string,
                    recipeId: string,
                    planSetId: string
                  ) =>
                    `/dashboard/god/brokerage/${brokerageId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/plansets/${planSetId}`,
                  plans: {
                    value:
                      "/dashboard/god/brokerage/:orgId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/plansets/:planSetId/plans/:planId?",
                    getValue: (
                      orgId: string,
                      prospectId: string,
                      recipeId: string,
                      planSetId: string,
                      planId: string = ""
                    ) =>
                      `/dashboard/god/brokerage/${orgId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/plansets/${planSetId}/plans/${planId}`,
                  },
                },
                stopLoss: {
                  value:
                    "/dashboard/god/brokerage/:brokerageId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/stop-loss/:stopLossId?",
                  getValue: (
                    orgId: string,
                    prospectId: string,
                    recipeId: string,
                    stopLossId = ""
                  ) =>
                    `/dashboard/god/brokerage/${orgId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/stop-loss/${stopLossId}`,
                },
                expenses: {
                  value:
                    "/dashboard/god/brokerage/:brokerageId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/expenses",
                  getValue: (
                    orgId: string,
                    prospectId: string,
                    recipeId: string
                  ) =>
                    `/dashboard/god/brokerage/${orgId}/prospects/onboarding/${prospectId}/program-build/recipe/${recipeId}/expenses`,
                },
              },
            },
          },
          oldDashboard: {
            value: `/dash/brokerage/prospects/org/:orgId/progress`,
            getValue: (orgId: string) =>
              `/dash/brokerage/prospects/org/${orgId}/progress`,
          },
        },
      },
      org: {
        list: {
          value: "/dashboard/god/org/list",
        },
      },
      tpa: {
        list: {
          value: "/dashboard/god/tpas/list",
        },
        add: {
          value: "/dashboard/god/tpa/create",
        },
        edit: {
          value: `/dashboard/god/tpa/:tpaId/edit`,
          getValue: (tpaId: string) => `/dashboard/god/tpa/${tpaId}/edit`,
        },
        programingredients: {
          value: `/dashboard/god/tpa/:tpaId/program-ingredients/list`,
          getValue: (tpaId: string) =>
            `/dashboard/god/tpa/${tpaId}/program-ingredients/list`,
        },
        editTpaProgramIngredients: {
          value: `/dashboard/god/tpa/:tpaId/program-ingredients/:programId`,
          getValue: (tpaId: string, programId: string) =>
            `/dashboard/god/tpa/${tpaId}/program-ingredients/${programId}`,
        },
      },
      carriers: {
        list: {
          value: "/dashboard/god/carriers/list",
        },
        edit: {
          value: "/dashboard/god/carrier/:carrierId/edit",
          getValue: (carrierId) => `/dashboard/god/carrier/${carrierId}/edit`,
        },
      },
      programIngredients: {
        list: {
          value: "/dashboard/god/program-ingredients/list",
        },
        add: {
          value: "/dashboard/god/program-ingredients/create",
        },
        edit: {
          value: "/dashboard/god/program-ingredients/:programId/edit",
          getValue: (programId) =>
            `/dashboard/god/program-ingredients/${programId}/edit`,
        },
      },
      orgs: {
        quoteMetrics: {
          value: "/dashboard/god/orgs/quote-metrics",
        },
      },

      rfps: {
        value: "/dashboard/god/rfps",
      },
    },
    brokerage: {
      brokerageId,
      withBrokerList: {
        value: "dashboard/brokerage/:brokerId/prospects/list",
        getValue: (brokerId: string) =>
          `dashboard/brokerage/${brokerId}/prospects/list`,
      },
      prospects: {
        value: `/dashboard/brokerage/prospects`,
        list: {
          value: "/dashboard/brokerage/prospects/list",
        },

        onBoarding: {
          profile: {
            value: "/dashboard/brokerage/prospects/onboarding/profile",
          },
          census: {
            choice: {
              value: `/dashboard/brokerage/prospects/onboarding/:orgId/census/choice`,
              getValue: (orgId) =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/census/choice`,
            },
            template: {
              value: `/dashboard/brokerage/prospects/onboarding/:orgId/census/template/:templateId?`,
              getValue: (orgId, templateId = "") =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/census/template/${templateId}`,
            },
            details: {
              value: `/dashboard/brokerage/prospects/onboarding/:orgId/census/details`,
              getValue: (orgId) =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/census/details`,
            },
          },
          health: {
            choice: {
              value: `/dashboard/brokerage/prospects/onboarding/:prospectId/health/choice`,
              getValue: (prospectId: string) =>
                `/dashboard/brokerage/prospects/onboarding/${prospectId}/health/choice`,
            },
            value: `/dashboard/brokerage/prospects/onboarding/:orgId/health/phqs/invite`,
            getValue: (orgId) =>
              `/dashboard/brokerage/prospects/onboarding/${orgId}/health/phqs/invite`,
            claimsDocuments: {
              value: (orgId: string) =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/health/claims-documents`,
            },
            claimsHistory: {
              value: (orgId: string) =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/health/claims-history`,
            },
            phqs: {
              invite: {
                value: (orgId: string) =>
                  `/dashboard/brokerage/prospects/onboarding/${orgId}/health/phqs/invite`,
              },
              assignPhqs: {
                value: (orgId: string) =>
                  `/dashboard/brokerage/prospects/onboarding/${orgId}/health/phqs/assign-phqs`,
              },
              status: {
                value: (orgId: string) =>
                  `/dashboard/brokerage/prospects/onboarding/${orgId}/health/phqs/status`,
              },
            },
          },
          existingPlans: {
            choice: {
              value: `/dashboard/brokerage/prospects/onboarding/:orgId/existing-plans/choice`,
              getValue: (orgId) =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/existing-plans/choice`,
            },
            selfFunded: {
              value: `/dashboard/brokerage/prospects/onboarding/:prospectId/existing-plans/self-funded-stop-loss`,
              getValue: (prospectId) =>
                `/dashboard/brokerage/prospects/onboarding/${prospectId}/existing-plans/self-funded-stop-loss`,
            },
            planDesign: {
              value: `/dashboard/brokerage/prospects/onboarding/:prospectId/existing-plans/plan-design/:planId?`,
              getValue: (prospectId, planId = "") =>
                `/dashboard/brokerage/prospects/onboarding/${prospectId}/existing-plans/plan-design/${planId}`,
            },
            participation: {
              value: `/dashboard/brokerage/prospects/onboarding/:prospectId/existing-plans/participation`,
              getValue: (prospectId) =>
                `/dashboard/brokerage/prospects/onboarding/${prospectId}/existing-plans/participation`,
            },
            documents: {
              value: `/dashboard/brokerage/prospects/onboarding/:orgId/existing-plans/documents`,
              getValue: (orgId) =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/existing-plans/documents`,
            },
          },
          programBuild: {
            choice: {
              value: (orgId: string) =>
                `/dashboard/brokerage/prospects/onboarding/${orgId}/program-build/choice`,
            },
          },
        },
        prospectId: {
          dashboard: {
            value: (prospectId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/dashboard`,
          },
          profile: {
            value: (prospectId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/profile`,
          },
          census: {
            value: (prospectId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/census`,
            details: {
              value: (prospectId: string) =>
                `/dashboard/brokerage/prospects/${prospectId}/census/details`,
            },
            template: {
              value: (prospectId: string) =>
                `/dashboard/brokerage/prospects/${prospectId}/census/template`,
              templateId: {
                value: (prospectId: string, templateId: string) =>
                  `/dashboard/brokerage/prospects/${prospectId}/census/template/${templateId}`,
              },
            },
          },
          plans: {
            fullyInsured: {
              documents: {
                value: (prospectId) =>
                  `/dashboard/brokerage/prospects/${prospectId}/plans/fully-insured/documents`,
              },
            },
          },
          health: {
            value: `/dashboard/brokerage/prospects/:prospectId/health`,
            getValue: (prospectId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/health`,
          },
          recipe: {
            value: (prospectId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/recipe`,
          },
          phqs: {
            value: `/dashboard/brokerage/prospects/:prospectId/phqs`,
            getValue: (prospectId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/phqs`,
          },
          claims: {
            documents: {
              value:
                "/dashboard/brokerage/prospects/:prospectId/claims/documents",
              getValue: (prospectId: string) =>
                `/dashboard/brokerage/prospects/${prospectId}/claims/documents`,
            },
            monthlyClaims: {
              value:
                "/dashboard/brokerage/prospects/:prospectId/claims/monthly-claims",
              getValue: (prospectId: string) =>
                `/dashboard/brokerage/prospects/${prospectId}/claims/monthly-claims`,
            },
            largeClaims: {
              value:
                "/dashboard/brokerage/prospects/:prospectId/claims/large-claims",
              getValue: (prospectId: string) =>
                `/dashboard/brokerage/prospects/${prospectId}/claims/large-claims`,
            },
          },
          programDetail: {
            value:
              "/dashboard/brokerage/prospects/:prospectId/program/:programId/illustrative/preview",
            getValue: (prospectId: string, programId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/program/${programId}/illustrative/preview`,
          },
          programEdit: {
            value:
              "/dashboard/brokerage/prospects/:prospectId/program/:programId/illustrative/edit",
            getValue: (prospectId: string, programId: string) =>
              `/dashboard/brokerage/prospects/${prospectId}/program/${programId}/illustrative/edit`,
          },
        },
      },
      templatePrograms: {
        value: "/dashboard/brokerage/template-programs",
      },
      editTemplatePrograms: {
        value:
          "/dashboard/brokerage/template-programs/edit/:programId/:versionId/stop-loss",
        getValue: (programId: string, versionId: string) =>
          `/dashboard/brokerage/template-programs/edit/${programId}/${versionId}/stop-loss`,
      },
      teamMembers: {
        value: "/dashboard/brokerage/:orgId/team-members",
        getValue: (orgId: string) =>
          `/dashboard/brokerage/${orgId}/team-members`,
      },
      security: {
        value: "/dashboard/brokerage/security",
      },
      changePassword: {
        value: "/dashboard/brokerage/change-password",
      },
    },
    changePassword: {
      value: "/dashboard/change-password",
    },
  },
  profile: {
    value: "/profile",
  },
  census: {
    value: "/census",
  },
  plans: {
    value: "/plans",
  },
  health: {
    value: "/health",
  },
  recipe: {
    value: "/recipe",
  },
  dash: {
    value: "/dash",
  },
};

export default routes;
