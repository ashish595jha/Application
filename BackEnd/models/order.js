const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
shippingAddress1:{
    type:String,
    required: true 
},
shippingAddress2:{
    type:String,
    required: true 
},
phone:{
    type:String,
    required: true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
status:{
    type:String,
    required:true,
    default: 'Pending'
},
totalPrice:{
    type:Number
},
city:{
    type:String,
    default: ''
},
zip:{
    type:String,
    default: ''
},
country:{
    type:String,
    default: ''
},
dateOrdered:{
    type:Date,
    default: Date.now
}
});
orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
orderSchema.set('toJSON',{
    virtuals:true,
});
exports.Order = mongoose.model('Order',orderSchema);