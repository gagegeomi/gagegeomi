function Node(data) {
    this.data = data;
    this.children = [];
}

class Tree {
    constructor() { this.root = []; }

    add(data) {
        const node = new Node(data); 
        this.root.push(node);
    }
    
    findBFS(parentId) {         
        let _node = null;
        this.traverseBFS( (node) => {               
            for(const n of node) {            
                var _pid = String(n.data.parentId);     
                if(_pid == parentId) _node = n;   
            }     
        })
        return _node;                 
    }

    traverseBFS(cb) {
        const queue = [this.root]             
        if(cb)
            while(queue.length) {
                const node = queue.shift();
                cb(node)      
            }
    }

}    

var makeTree = async function (allWorks) {    

    let newTree = new Tree();

    return await new Promise((resolve, reject) => {
        allWorks.forEach(w => {        
            newTree.add(w);    
        })
        resolve(newTree)                         
    })
}

module.exports = {
    getAllList: async (allWorks) => { 
        return await new Promise((resolve, reject) => {
            makeTree(allWorks).then( (tree) => {

                var root = tree.root;

                root.forEach(node => {
                    const child = tree.findBFS(node.data.id);     
                    
                    if(child) node.children.push(child)   
                    //console.log('node',node);
                    
                });       
                
                tree.traverseBFS( (node) => { 
                    
                    var nodes = [];
                    var workList = '<ul id="treeUl"><li><span class="box check-box">works</span><ul class="nested active">';
                
                    node.forEach(n => {

                        nodes.push(n);
                        //console.log('nodes push > ',n.data.title);

                    })

                    function childGET(parent) { 

                        var str = '';   

                        if(parent.children.length > 0) {                    
                            str += '<ul class="nested">';  
                                nodes.forEach(node => {    
                                    if(node.data.parentId == parent.data.id) {
                                        str += '<li>';
                                        var link = '<a class="none" href="javascript:void(0)" onclick="onloadWorksUrl(\''+ node.data.id +'\')">' + node.data.title + '</a><input type="hidden" id="worksUrl'+ node.data.id +'" value="'+ node.data.url +'" />';

                                        if(node.children.length == 0) {
                                                
                                            str += link;
                                            str += '</li>';
                                            //console.log(' 3 >>>',node.data.title);

                                        } else {

                                        str += '<span class="box">';
                                        str += '</span>';
                                        str += link;

                                        //console.log(' 2 >>',node.data.title);
                                        
                                    }
                                
                                    str += childGET(node)
                                    str += '</li>'
                                    
                                    }

                                })   
                            str += '</ul>'

                        }
                        return str;
                    }
                    
                    nodes.forEach(node => {    

                        let link = '<a class="none" href="javascript:void(0)" onclick="onloadWorksUrl(\''+ node.data.id +'\')">' + node.data.title + '</a><input type="hidden" id="worksUrl'+ node.data.id +'" value="'+ node.data.url +'" />';
                        
                        if(node.data.parentId == '0') {   

                            workList += '<li>';    

                            if(node.children.length > 0){

                                workList += '<span class="box">';
                                workList += '</span>';                                   
                                workList += link
        
                            } else {
                          
                                workList += link;
                                workList += '</li>';         
                        

                            }
                                                
                            //console.log('1 >',node.data.title);
                            workList += childGET(node);                            
                            
                        } 
           
                        
                    }); 
                    
                    resolve(workList);              
                        
                });
                    
                    
            });                    
        })              
    }   
}