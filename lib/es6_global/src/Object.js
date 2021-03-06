'use strict';

import * as List       from "../../../node_modules/bs-platform/lib/es6/list.js";
import * as Block      from "../../../node_modules/bs-platform/lib/es6/block.js";
import * as Sprite     from "./Sprite.js";
import * as Caml_obj   from "../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Particle   from "./Particle.js";
import * as Pervasives from "../../../node_modules/bs-platform/lib/es6/pervasives.js";

var id_counter = [Pervasives.min_int];

function setup_obj($staropt$star, $staropt$star$1, _) {
  var has_gravity = $staropt$star ? $staropt$star[0] : /* true */1;
  var speed = $staropt$star$1 ? $staropt$star$1[0] : 1;
  return /* record */[
          /* has_gravity */has_gravity,
          /* speed */speed
        ];
}

function set_vel_to_speed(obj) {
  var speed = obj[/* params */0][/* speed */1];
  var match = obj[/* dir */6];
  if (match !== 0) {
    obj[/* vel */2][/* x */0] = speed;
    return /* () */0;
  } else {
    obj[/* vel */2][/* x */0] = -speed;
    return /* () */0;
  }
}

function make_type(param) {
  switch (param.tag | 0) {
    case 0 : 
        return setup_obj(/* None */0, /* Some */[2.8], /* () */0);
    case 1 : 
        var param$1 = param[0];
        if (param$1 >= 3) {
          return setup_obj(/* None */0, /* Some */[3], /* () */0);
        } else {
          return setup_obj(/* None */0, /* None */0, /* () */0);
        }
    case 2 : 
        var param$2 = param[0];
        if (param$2 >= 3) {
          return setup_obj(/* Some */[/* false */0], /* None */0, /* () */0);
        } else {
          return setup_obj(/* None */0, /* None */0, /* () */0);
        }
    case 3 : 
        return setup_obj(/* Some */[/* false */0], /* None */0, /* () */0);
    
  }
}

function new_id() {
  id_counter[0] = id_counter[0] + 1 | 0;
  return id_counter[0];
}

function make($staropt$star, $staropt$star$1, spawnable, context, param) {
  var id = $staropt$star ? $staropt$star[0] : /* None */0;
  var dir = $staropt$star$1 ? $staropt$star$1[0] : /* Left */0;
  var spr = Sprite.make(spawnable, dir, context);
  var params = make_type(spawnable);
  var id$1 = id ? id[0] : new_id(/* () */0);
  var obj = /* record */[
    /* params */params,
    /* pos : float array */[
      param[0],
      param[1]
    ],
    /* vel : float array */[
      0.0,
      0.0
    ],
    /* id */id$1,
    /* jumping : false */0,
    /* grounded : false */0,
    /* dir */dir,
    /* invuln */0,
    /* kill : false */0,
    /* health */1,
    /* crouch : false */0,
    /* score */0
  ];
  return /* tuple */[
          spr,
          obj
        ];
}

function spawn(spawnable, context, param) {
  var match = make(/* None */0, /* None */0, spawnable, context, /* tuple */[
        param[0],
        param[1]
      ]);
  var obj = match[1];
  var spr = match[0];
  switch (spawnable.tag | 0) {
    case 0 : 
        return /* Player */Block.__(0, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    case 1 : 
        set_vel_to_speed(obj);
        return /* Enemy */Block.__(1, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    case 2 : 
        return /* Item */Block.__(2, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    case 3 : 
        return /* Block */Block.__(3, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    
  }
}

function get_sprite(param) {
  return param[1];
}

function get_obj(param) {
  return param[2];
}

function is_player(param) {
  if (param.tag) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function is_enemy(param) {
  if (param.tag === 1) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function equals(col1, col2) {
  return +(col1[2][/* id */3] === col2[2][/* id */3]);
}

function normalize_pos(pos, p1, p2) {
  var match = p1[/* bbox_offset */5];
  var match$1 = p2[/* bbox_offset */5];
  var match$2 = p1[/* bbox_size */6];
  var match$3 = p2[/* bbox_size */6];
  pos[/* x */0] = pos[/* x */0] - (match$3[0] + match$1[0]) + (match$2[0] + match[0]);
  pos[/* y */1] = pos[/* y */1] - (match$3[1] + match$1[1]) + (match$2[1] + match[1]);
  return /* () */0;
}

function update_player(player, keys, context) {
  var prev_jumping = player[/* jumping */4];
  var prev_dir = player[/* dir */6];
  var prev_vx = Math.abs(player[/* vel */2][/* x */0]);
  List.iter((function (param) {
          var player$1 = player;
          var controls = param;
          var lr_acc = player$1[/* vel */2][/* x */0] * 0.2;
          switch (controls) {
            case 0 : 
                if (player$1[/* crouch */10]) {
                  return 0;
                } else {
                  if (player$1[/* vel */2][/* x */0] > -player$1[/* params */0][/* speed */1]) {
                    player$1[/* vel */2][/* x */0] = player$1[/* vel */2][/* x */0] - (0.4 - lr_acc);
                  }
                  player$1[/* dir */6] = /* Left */0;
                  return /* () */0;
                }
                break;
            case 1 : 
                if (player$1[/* crouch */10]) {
                  return 0;
                } else {
                  if (player$1[/* vel */2][/* x */0] < player$1[/* params */0][/* speed */1]) {
                    player$1[/* vel */2][/* x */0] = player$1[/* vel */2][/* x */0] + (0.4 + lr_acc);
                  }
                  player$1[/* dir */6] = /* Right */1;
                  return /* () */0;
                }
                break;
            case 2 : 
                if (!player$1[/* jumping */4] && player$1[/* grounded */5]) {
                  player$1[/* jumping */4] = /* true */1;
                  player$1[/* grounded */5] = /* false */0;
                  player$1[/* vel */2][/* y */1] = Pervasives.max(player$1[/* vel */2][/* y */1] - (5.7 + Math.abs(player$1[/* vel */2][/* x */0]) * 0.25), -6);
                  return /* () */0;
                } else {
                  return 0;
                }
            case 3 : 
                if (!player$1[/* jumping */4] && player$1[/* grounded */5]) {
                  player$1[/* crouch */10] = /* true */1;
                  return /* () */0;
                } else {
                  return 0;
                }
            
          }
        }), keys);
  var v = player[/* vel */2][/* x */0] * 0.9;
  var vel_damped = Math.abs(v) < 0.1 ? 0 : v;
  player[/* vel */2][/* x */0] = vel_damped;
  var pl_typ = player[/* health */9] <= 1 ? /* SmallM */1 : /* BigM */0;
  if (!prev_jumping && player[/* jumping */4]) {
    return /* Some */[/* tuple */[
              pl_typ,
              Sprite.make(/* SPlayer */Block.__(0, [
                      pl_typ,
                      /* Jumping */1
                    ]), player[/* dir */6], context)
            ]];
  } else if (Caml_obj.caml_notequal(prev_dir, player[/* dir */6]) || prev_vx === 0 && Math.abs(player[/* vel */2][/* x */0]) > 0 && !player[/* jumping */4]) {
    return /* Some */[/* tuple */[
              pl_typ,
              Sprite.make(/* SPlayer */Block.__(0, [
                      pl_typ,
                      /* Running */2
                    ]), player[/* dir */6], context)
            ]];
  } else if (Caml_obj.caml_notequal(prev_dir, player[/* dir */6]) && player[/* jumping */4] && prev_jumping) {
    return /* Some */[/* tuple */[
              pl_typ,
              Sprite.make(/* SPlayer */Block.__(0, [
                      pl_typ,
                      /* Jumping */1
                    ]), player[/* dir */6], context)
            ]];
  } else if (player[/* vel */2][/* y */1] === 0 && player[/* crouch */10]) {
    return /* Some */[/* tuple */[
              pl_typ,
              Sprite.make(/* SPlayer */Block.__(0, [
                      pl_typ,
                      /* Crouching */3
                    ]), player[/* dir */6], context)
            ]];
  } else if (player[/* vel */2][/* y */1] === 0 && player[/* vel */2][/* x */0] === 0) {
    return /* Some */[/* tuple */[
              pl_typ,
              Sprite.make(/* SPlayer */Block.__(0, [
                      pl_typ,
                      /* Standing */0
                    ]), player[/* dir */6], context)
            ]];
  } else {
    return /* None */0;
  }
}

function update_vel(obj) {
  if (obj[/* grounded */5]) {
    obj[/* vel */2][/* y */1] = 0;
    return /* () */0;
  } else if (obj[/* params */0][/* has_gravity */0]) {
    obj[/* vel */2][/* y */1] = Pervasives.min(obj[/* vel */2][/* y */1] + 0.2 + Math.abs(obj[/* vel */2][/* y */1]) * 0.01, 4.5);
    return /* () */0;
  } else {
    return 0;
  }
}

function update_pos(obj) {
  obj[/* pos */1][/* x */0] = obj[/* vel */2][/* x */0] + obj[/* pos */1][/* x */0];
  if (obj[/* params */0][/* has_gravity */0]) {
    obj[/* pos */1][/* y */1] = obj[/* vel */2][/* y */1] + obj[/* pos */1][/* y */1];
    return /* () */0;
  } else {
    return 0;
  }
}

function process_obj(obj, mapy) {
  update_vel(obj);
  update_pos(obj);
  if (obj[/* pos */1][/* y */1] > mapy) {
    obj[/* kill */8] = /* true */1;
    return /* () */0;
  } else {
    return 0;
  }
}

function normalize_origin(pos, spr) {
  var p = spr[/* params */0];
  var match = p[/* bbox_offset */5];
  var match$1 = p[/* bbox_size */6];
  pos[0] -= match[0];
  pos[1] -= (match[1] + match$1[1]);
  return /* () */0;
}

function collide_block($staropt$star, dir, obj) {
  var check_x = $staropt$star ? $staropt$star[0] : /* true */1;
  if (dir !== 1) {
    if (dir !== 0) {
      if (check_x) {
        obj[/* vel */2][/* x */0] = 0;
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      obj[/* vel */2][/* y */1] = -0.001;
      return /* () */0;
    }
  } else {
    obj[/* vel */2][/* y */1] = 0;
    obj[/* grounded */5] = /* true */1;
    obj[/* jumping */4] = /* false */0;
    return /* () */0;
  }
}

function opposite_dir(dir) {
  if (dir !== 0) {
    return /* Left */0;
  } else {
    return /* Right */1;
  }
}

function reverse_left_right(obj) {
  obj[/* vel */2][/* x */0] = -obj[/* vel */2][/* x */0];
  obj[/* dir */6] = opposite_dir(obj[/* dir */6]);
  return /* () */0;
}

function evolve_enemy(player_dir, typ, spr, obj, context) {
  var exit = 0;
  switch (typ) {
    case 0 : 
        obj[/* kill */8] = /* true */1;
        return /* None */0;
    case 1 : 
        var match = make(/* None */0, /* Some */[obj[/* dir */6]], /* SEnemy */Block.__(1, [/* GKoopaShell */3]), context, /* tuple */[
              obj[/* pos */1][/* x */0],
              obj[/* pos */1][/* y */1]
            ]);
        var new_obj = match[1];
        var new_spr = match[0];
        normalize_pos(new_obj[/* pos */1], spr[/* params */0], new_spr[/* params */0]);
        return /* Some */[/* Enemy */Block.__(1, [
                    /* GKoopaShell */3,
                    new_spr,
                    new_obj
                  ])];
    case 2 : 
        var match$1 = make(/* None */0, /* Some */[obj[/* dir */6]], /* SEnemy */Block.__(1, [/* RKoopaShell */4]), context, /* tuple */[
              obj[/* pos */1][/* x */0],
              obj[/* pos */1][/* y */1]
            ]);
        var new_obj$1 = match$1[1];
        var new_spr$1 = match$1[0];
        normalize_pos(new_obj$1[/* pos */1], spr[/* params */0], new_spr$1[/* params */0]);
        return /* Some */[/* Enemy */Block.__(1, [
                    /* RKoopaShell */4,
                    new_spr$1,
                    new_obj$1
                  ])];
    case 3 : 
    case 4 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    obj[/* dir */6] = player_dir;
    if (obj[/* vel */2][/* x */0] !== 0) {
      obj[/* vel */2][/* x */0] = 0;
    } else {
      set_vel_to_speed(obj);
    }
    return /* None */0;
  }
  
}

function rev_dir(o, t, s) {
  reverse_left_right(o);
  var old_params = s[/* params */0];
  Sprite.transform_enemy(t, s, o[/* dir */6]);
  return normalize_pos(o[/* pos */1], old_params, s[/* params */0]);
}

function dec_health(obj) {
  var health = obj[/* health */9] - 1 | 0;
  if (health) {
    if (obj[/* invuln */7]) {
      return 0;
    } else {
      obj[/* health */9] = health;
      return /* () */0;
    }
  } else {
    obj[/* kill */8] = /* true */1;
    return /* () */0;
  }
}

function evolve_block(obj, context) {
  dec_health(obj);
  var match = make(/* None */0, /* None */0, /* SBlock */Block.__(3, [/* QBlockUsed */0]), context, /* tuple */[
        obj[/* pos */1][/* x */0],
        obj[/* pos */1][/* y */1]
      ]);
  return /* Block */Block.__(3, [
            /* QBlockUsed */0,
            match[0],
            match[1]
          ]);
}

function spawn_above(player_dir, obj, typ, context) {
  var item = spawn(/* SItem */Block.__(2, [typ]), context, /* tuple */[
        obj[/* pos */1][/* x */0],
        obj[/* pos */1][/* y */1]
      ]);
  var item_obj = item[2];
  item_obj[/* pos */1][/* y */1] = item_obj[/* pos */1][/* y */1] - item[1][/* params */0][/* frame_size */3][1];
  item_obj[/* dir */6] = opposite_dir(player_dir);
  set_vel_to_speed(item_obj);
  return item;
}

function get_aabb(obj) {
  var spr = obj[1][/* params */0];
  var obj$1 = obj[2];
  var match = spr[/* bbox_offset */5];
  var match_000 = obj$1[/* pos */1][/* x */0] + match[0];
  var match_001 = obj$1[/* pos */1][/* y */1] + match[1];
  var match$1 = spr[/* bbox_size */6];
  var sy = match$1[1];
  var sx = match$1[0];
  return /* record */[
          /* center : float array */[
            match_000 + sx / 2,
            match_001 + sy / 2
          ],
          /* half : float array */[
            sx / 2,
            sy / 2
          ]
        ];
}

function col_bypass(c1, c2) {
  var o1 = c1[2];
  var o2 = c2[2];
  var ctypes;
  switch (c1.tag | 0) {
    case 0 : 
        ctypes = c2.tag === 1 && c1[2][/* invuln */7] > 0 ? /* true */1 : /* false */0;
        break;
    case 1 : 
        ctypes = c2.tag === 2 ? /* true */1 : /* false */0;
        break;
    case 2 : 
        switch (c2.tag | 0) {
          case 1 : 
          case 2 : 
              ctypes = /* true */1;
              break;
          case 0 : 
          case 3 : 
              ctypes = /* false */0;
              break;
          
        }
        break;
    case 3 : 
        ctypes = /* false */0;
        break;
    
  }
  if (o1[/* kill */8] || o2[/* kill */8]) {
    return /* true */1;
  } else {
    return ctypes;
  }
}

function check_collision(c1, c2) {
  var b1 = get_aabb(c1);
  var b2 = get_aabb(c2);
  var o1 = c1[2];
  if (col_bypass(c1, c2)) {
    return /* None */0;
  } else {
    var vx = b1[/* center */0][/* x */0] - b2[/* center */0][/* x */0];
    var vy = b1[/* center */0][/* y */1] - b2[/* center */0][/* y */1];
    var hwidths = b1[/* half */1][/* x */0] + b2[/* half */1][/* x */0];
    var hheights = b1[/* half */1][/* y */1] + b2[/* half */1][/* y */1];
    if (Math.abs(vx) < hwidths && Math.abs(vy) < hheights) {
      var ox = hwidths - Math.abs(vx);
      var oy = hheights - Math.abs(vy);
      if (ox >= oy) {
        if (vy > 0) {
          o1[/* pos */1][/* y */1] = o1[/* pos */1][/* y */1] + oy;
          return /* Some */[/* North */0];
        } else {
          o1[/* pos */1][/* y */1] = o1[/* pos */1][/* y */1] - oy;
          return /* Some */[/* South */1];
        }
      } else if (vx > 0) {
        o1[/* pos */1][/* x */0] = o1[/* pos */1][/* x */0] + ox;
        return /* Some */[/* West */3];
      } else {
        o1[/* pos */1][/* x */0] = o1[/* pos */1][/* x */0] - ox;
        return /* Some */[/* East */2];
      }
    } else {
      return /* None */0;
    }
  }
}

function kill(collid, ctx) {
  switch (collid.tag | 0) {
    case 0 : 
        return /* [] */0;
    case 1 : 
        var o = collid[2];
        var pos_000 = o[/* pos */1][/* x */0];
        var pos_001 = o[/* pos */1][/* y */1];
        var pos = /* tuple */[
          pos_000,
          pos_001
        ];
        var score = o[/* score */11] > 0 ? /* :: */[
            Particle.make_score(o[/* score */11], pos, ctx),
            /* [] */0
          ] : /* [] */0;
        var remains = collid[0] !== 0 ? /* [] */0 : /* :: */[
            Particle.make(/* None */0, /* None */0, /* GoombaSquish */0, pos, ctx),
            /* [] */0
          ];
        return Pervasives.$at(score, remains);
    case 2 : 
        var o$1 = collid[2];
        if (collid[0] !== 0) {
          return /* [] */0;
        } else {
          return /* :: */[
                  Particle.make_score(o$1[/* score */11], /* tuple */[
                        o$1[/* pos */1][/* x */0],
                        o$1[/* pos */1][/* y */1]
                      ], ctx),
                  /* [] */0
                ];
        }
    case 3 : 
        var o$2 = collid[2];
        var t = collid[0];
        if (typeof t === "number") {
          if (t !== 1) {
            return /* [] */0;
          } else {
            var pos_000$1 = o$2[/* pos */1][/* x */0];
            var pos_001$1 = o$2[/* pos */1][/* y */1];
            var pos$1 = /* tuple */[
              pos_000$1,
              pos_001$1
            ];
            var p1 = Particle.make(/* Some */[/* tuple */[
                    -5,
                    -5
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkL */1, pos$1, ctx);
            var p2 = Particle.make(/* Some */[/* tuple */[
                    -3,
                    -4
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkL */1, pos$1, ctx);
            var p3 = Particle.make(/* Some */[/* tuple */[
                    3,
                    -4
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkR */2, pos$1, ctx);
            var p4 = Particle.make(/* Some */[/* tuple */[
                    5,
                    -5
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkR */2, pos$1, ctx);
            return /* :: */[
                    p1,
                    /* :: */[
                      p2,
                      /* :: */[
                        p3,
                        /* :: */[
                          p4,
                          /* [] */0
                        ]
                      ]
                    ]
                  ];
          }
        } else {
          return /* [] */0;
        }
        break;
    
  }
}

var invuln = 60;

var dampen_jump = 4;

export {
  invuln             ,
  dampen_jump        ,
  get_sprite         ,
  get_obj            ,
  spawn              ,
  equals             ,
  is_player          ,
  is_enemy           ,
  normalize_origin   ,
  normalize_pos      ,
  kill               ,
  process_obj        ,
  update_player      ,
  check_collision    ,
  evolve_enemy       ,
  evolve_block       ,
  dec_health         ,
  rev_dir            ,
  reverse_left_right ,
  collide_block      ,
  spawn_above        ,
  
}
/* No side effect */
