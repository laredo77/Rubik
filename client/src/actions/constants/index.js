/*
  Constants reducer actions
 */

const ACTIONS = {
    // User actions
    ADD_USER_REQUEST: "add_user_request",
    ADD_USER_SUCCESS: "add_user_success",
    ADD_USER_FAILURE: "add_user_failure",

    // Game actions
    GET_GAME_STATE_REQUEST: "get_game_state_request",
    GET_GAME_STATE_SUCCESS: "get_game_state_success",
    GET_GAME_STATE_FAILURE: "get_game_state_failure",

    SET_GAME_LEVEL_REQUEST: "set_game_level_request",
    SET_GAME_LEVEL_SUCCESS: "set_game_level_success",
    SET_GAME_LEVEL_FAILURE: "set_game_level_failure",

    MARK_SOLVED_REQUEST: "mark_solved_request",
    MARK_SOLVED_SUCCESS: "mark_solved_success",
    MARK_SOLVED_FAILURE: "mark_solved_failure",

    SET_MOSAIC_MATCH_REQUEST: "set_mosaic_match_request",
    SET_MOSAIC_MATCH_SUCCESS: "set_mosaic_match_success",
    SET_MOSAIC_MATCH_FAILURE: "set_mosaic_match_failure",
    IS_MOSAIC_MATCH_READY: "is_mosaic_match_ready",

    JOIN_MOSAIC_MATCH_REQUEST: "join_mosaic_match_request",
    JOIN_MOSAIC_MATCH_SUCCESS: "join_mosaic_match_success",
    JOIN_MOSAIC_MATCH_FAILURE: "join_mosaic_match_failure",

    // Match actions
    SET_MATCH_REQUEST: "set_match_request",
    SET_MATCH_SUCCESS: "set_match_success",
    SET_MATCH_FAILURE: "set_match_failure",
    IS_MATCH_READY: "is_match_ready",

    JOIN_MATCH_REQUEST: "join_match_request",
    JOIN_MATCH_SUCCESS: "join_match_success",
    JOIN_MATCH_FAILURE: "join_match_failure",
};

export default ACTIONS;
