import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from  'jquery';
import loadAllItems from './loadAllItems'
class ShoppingList extends Component{
  render(){ 
      var loadAllitems = loadAllItems();
      var showShoppingList = []
      var totalPrice = 0;
      for (let i = 0; i < 6; i++) {
        let id = '#00' + i;
        let barcode = 'ITEM00000' + i;
        var number = $(id).val();
        for(let j = 0;j < loadAllitems.length;j++){
          if(number)
          if(barcode===loadAllitems[j].barcode){
            showShoppingList.push(loadAllitems[j].name + number + loadAllitems[j].unit+'\n');
            totalPrice += number * loadAllitems[j].price;
          }
        }
      }
    return(
    <div>
    {showShoppingList}
    <br/>
    共计：{totalPrice}
    <br/>
    <button id="dataDeliver" onClick={this.dataDeliver}>确定</button>
    </div>)
  }
  dataDeliver(){  
      
      var shoppingList = [];
    for (let i = 0; i < 6; i++) {
        var id = '#00' + i;
        var number = $(id).val();
        if (i !== 2 || i !== 3) {
        if (number) {
          for (let j = 0; j < number; j++)
             shoppingList.push('ITEM00000' + i);
                      }
           } else { 
               if (number) {
               shoppingList.push('ITEM00000' + i + '-' + number);
                }
           }
        }
        $.get("/mock/5b59d6f6d86c9e0020133557/example/restful/:id/list",function(){
          alert("数据：" + shoppingList);
        });
      return shoppingList;
}
}
class App extends Component {
  
  showShoppingList() {
    ReactDOM.render(
      <ShoppingList />,
      document.getElementById('selectedmenus')
    )
  }
  
  
  render() {
    return (
      <div className="App">
        <p>超市</p>
        <div id="items">
        {console.log('aaaaa')}
        <p>请输入所选数量：</p>
        <div name="menus" id="menus">
            <p className="good"><span className="000">可乐 （3元／瓶, 打折商品，满三免一）</span><input id="000"/></p>
            <p className="good"><span className="001">雪碧 （3元／瓶，打折商品，满三免一）</span><input id="001"/></p>
            <p className="good"><span className="002">苹果 （5.5元／斤）</span><input id="002"/></p>
            <p className="good"><span className="003">荔枝 （15元／斤）</span><input id="003"/></p>
            <p className="good"><span className="004">电池 （2元／个）</span><input id="004"/></p>
            <p className="good"><span className="005">方便面 （4.5／袋）</span><input id="005"/></p>
        </div>
        <button id="confirm"  onClick={this.showShoppingList}>加入购物车</button>
        <div id="selectedmenus"></div>
        </div>
      </div>
    );
  }
}
export default App;


