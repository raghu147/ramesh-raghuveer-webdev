module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type:mongoose.Schema.Types.ObjectId, ref:'PageModel'},
        widgetType: String,
        name: String,
        size: Number,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        icon: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});

    return WidgetSchema;
};