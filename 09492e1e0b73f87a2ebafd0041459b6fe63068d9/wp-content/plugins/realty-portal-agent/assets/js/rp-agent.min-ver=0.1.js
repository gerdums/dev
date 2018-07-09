!function(e){"use strict";e(document).on("click","#menu-item-login",function(e){new Custombox.modal({content:{target:"#rp-box-login",effect:"flip",width:800,overlayOpacity:.8,position:["center","top"]}}).open(),e.preventDefault()}),e(document).on("click","#menu-item-register ",function(e){new Custombox.modal({content:{target:"#rp-box-register ",effect:"flip",width:800,overlayOpacity:.8,position:["center","top"]}}).open(),e.preventDefault()}),e(document).ready(function(){e(document).on("click",".rp-form-register .rp-button",function(t){t.preventDefault();var s=e(this),a=s.closest(".rp-form-register").serializeArray();a.push({name:"action",value:"rp_register_member"},{name:"security",value:RP_Agent.security}),e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:a,beforeSend:function(){s.find(">i").removeClass("hide"),s.closest(".rp-register-member-action").find(".notice").html("").hide()},success:function(t){try{s.find(">i").addClass("hide");var a=t.status;s.closest(".rp-register-member-action").find(".notice").html(t.msg).show().addClass(a),"success"==a?(e.notifyBar({cssClass:"success",html:t.message,position:"bottom"}),setTimeout(function(){window.location.href=t.url_redirect},3e3)):e.notifyBar({cssClass:"error",html:t.message,position:"bottom"})}catch(t){e.notifyBar({cssClass:"error",html:t,position:"bottom"})}}})}),e(document).on("click",".rp-form-login .rp-button",function(t){t.preventDefault();var s=e(this),a=s.closest(".rp-form-login").serializeArray();a.push({name:"action",value:"rp_login_member"},{name:"security",value:RP_Agent.security}),e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:a,beforeSend:function(){s.find(">i").removeClass("hide"),s.find(".rp-item-wrap").removeClass("validate-error").find(".notice").hide(),s.closest(".rp-login-member-action").find(".notice").html("").hide()},success:function(t){try{s.find(">i").addClass("hide");"success"===t.status?(e.notifyBar({cssClass:"success",html:t.message,position:"bottom"}),setTimeout(function(){window.location.href=t.url_redirect},3e3)):e.notifyBar({cssClass:"error",html:t.message,position:"bottom"})}catch(t){e.notifyBar({cssClass:"error",html:t,position:"bottom"})}}})})}),jQuery(document).ready(function(e){e(".rp-box-contact-agent").length>0&&e(".rp-box-contact-agent").each(function(){var t=e(this);t.on("click",".rp-submit",function(s){s.preventDefault();var a=t.serializeArray(),o=e(this);a.push({name:"action",value:"rp_contact_agent"},{name:"security",value:RP_Agent.security}),e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:a,beforeSend:function(){o.find(">i").removeClass("hide")},success:function(t){o.find(">i").addClass("hide"),e.notifyBar({cssClass:t.status,html:t.message,position:"bottom"})}})})}),e("body").on("click",".more-action .rp-event",function(t){t.preventDefault();var s=e(this),a=s.data("process"),o=(s.data("user"),s.data("id"));"remove"==a?e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:{action:"rp_agent_dashboard",security:RP_Agent.security,type:"remove",property_id:o},beforeSend:function(){s.addClass("loadmore")},complete:function(t){try{s.removeClass("loadmore"),s.closest(".property-item").remove(),e.notifyBar({cssClass:t.status,html:t.message,position:"bottom"})}catch(t){e.notifyBar({cssClass:"error",html:t,position:"bottom"})}}}):"sold"==a?e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:{action:"rp_agent_dashboard",security:RP_Agent.security,type:"sold",property_id:o},beforeSend:function(){s.addClass("loadmore")},complete:function(){try{s.hasClass("unavailable")?(s.removeClass("unavailable"),s.closest(".property-item").find(".rp-thumbnail").removeClass("unavailable")):(s.addClass("unavailable"),s.closest(".property-item").find(".rp-thumbnail").addClass("unavailable")),s.removeClass("loadmore")}catch(t){e.notifyBar({cssClass:"error",html:t,position:"bottom"})}}}):"featured"==a&&e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:{action:"rp_agent_dashboard",security:RP_Agent.security,type:"featured",property_id:o},beforeSend:function(){if(s.hasClass("not-set-feauted"))return e.notifyBar({cssClass:"error",html:"The number of added featured properties exceeded the limit. Please upgrade a new package.!",position:"bottom"}),!1;s.addClass("loadmore")},success:function(t){try{if("error"===t.status)return s.addClass("not-set-feauted"),!1;s.hasClass("is-featured")?(s.removeClass("is-featured rp-icon-star"),s.addClass("rp-icon-star-o")):(s.removeClass("rp-icon-star-o"),s.addClass("is-featured rp-icon-star")),s.removeClass("loadmore"),e.notifyBar({cssClass:t.status,html:t.message,position:"bottom"})}catch(t){e.notifyBar({cssClass:"error",html:t,position:"bottom"})}}})}),e(".rp-user-profile").length>0&&e(".rp-user-profile").find(".rp-profile-action").on("click","button.rp-button",function(t){t.preventDefault();var s=e(this),a=s.closest("form").serializeArray();a.push({name:"action",value:"rp_user_profile"},{name:"security",value:RP_Agent.security}),e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:a,beforeSend:function(){s.find("i").removeClass("hide")},success:function(t){s.find("i").addClass("success").removeClass("rp-icon-spin"),setTimeout(function(){s.find("i").addClass("hide rp-icon-spin").removeClass("success")},3e3),s.closest("form").find(".rp-notice").html(t.msg).addClass(t.status).show(),"error"===t.status&&"undefined"!=typeof t["class"]&&""!==t["class"]&&e("#"+t["class"]).closest(".rp-item-wrap").addClass("validate-error"),setTimeout(function(){s.closest("form").focus()},1)}})}),e(".rp-agent-profile").length>0&&e(".rp-agent-profile").find(".rp-profile-action").on("click","button.rp-button",function(t){t.preventDefault();var s=e(this),a=s.closest("form").serializeArray();a.push({name:"action",value:"rp_agent_profile"},{name:"security",value:RP_Agent.security}),e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:a,beforeSend:function(){s.find("i").removeClass("hide")},success:function(t){s.find("i").addClass("success").removeClass("rp-icon-spin"),setTimeout(function(){s.find("i").addClass("hide rp-icon-spin").removeClass("success")},3e3),e.notifyBar({cssClass:t.status,html:t.msg,position:"bottom"}),setTimeout(function(){s.closest("form").focus()},1)}})}),function(){e(".loadmore-property-agent").length>0&&e(document).on("click",".loadmore-property-agent",function(t){t.preventDefault();var s=e(this),a=s.data("agent-id"),o=s.data("page-current"),r=s.data("max-page"),n=s.data("posts-per-page");e.ajax({url:RP_Agent.ajax_url,type:"POST",dataType:"json",data:{action:"load_more_property_agent",security:RP_Agent.security,agent_id:a,page_current:o,max_page:r,posts_per_page:n},beforeSend:function(){},success:function(t){try{"success"==t.status?(s.closest(".rp-property-agent").find("ul").append(t.html),s.data("page-current",o+1)):"end"==t.status?(e.notifyBar({cssClass:"success",html:"Complete",position:"bottom"}),s.hide()):e.notifyBar({cssClass:"error",html:t.message,position:"bottom"})}catch(t){e.notifyBar({cssClass:"error",html:t,position:"bottom"})}}})})}()})}(jQuery);
//# sourceMappingURL=rp-agent.min.js.map