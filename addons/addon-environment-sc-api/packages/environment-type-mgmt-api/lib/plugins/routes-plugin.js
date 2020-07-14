const setupAuthContext = require('@aws-ee/base-controllers/lib/middlewares/setup-auth-context');
const prepareContext = require('@aws-ee/base-controllers/lib/middlewares/prepare-context');
const ensureActive = require('@aws-ee/base-controllers/lib/middlewares/ensure-active');

const envTypesController = require('../controllers/env-types-controller');
const envTypeCandidatesController = require('../controllers/env-type-candidates-controller');
const envTypeConfigsController = require('../controllers/env-type-configs-controller');
const envTypeConfigVarsController = require('../controllers/env-type-config-vars-controller');

/**
 * Adds routes to the given routesMap.
 *
 * @param routesMap A Map containing routes. This object is a Map that has route paths as
 * keys and an array of functions that configure the router as value. Each function in the
 * array is expected have the following signature. The function accepts context and router
 * arguments and returns a configured router.
 *
 * (context, router) => configured router
 *
 * @param pluginRegistry A registry that provides plugins registered by various addons for the specified extension point.
 *
 * @returns {Promise<*>} Returns a Map with the mapping of the routes vs their router configurer functions
 */
// eslint-disable-next-line no-unused-vars
async function getRoutes(routesMap, pluginRegistry) {
  const routes = new Map([
    ...routesMap,
    // PROTECTED APIS accessible only to logged in active users
    [
      '/api/workspace-types/:id/config-vars',
      [setupAuthContext, prepareContext, ensureActive, envTypeConfigVarsController],
    ],
    [
      '/api/workspace-types/:id/configurations',
      [setupAuthContext, prepareContext, ensureActive, envTypeConfigsController],
    ],
    ['/api/workspace-type-candidates', [setupAuthContext, prepareContext, ensureActive, envTypeCandidatesController]],
    ['/api/workspace-types', [setupAuthContext, prepareContext, ensureActive, envTypesController]],
  ]);
  return routes;
}
const plugin = {
  getRoutes,
};

module.exports = plugin;
