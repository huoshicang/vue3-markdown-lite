<template>
  {{ colorScheme }}
  <MarkdownViewer :text="text" :colorScheme="colorScheme" />
</template>
<script setup lang="ts">
import { MarkdownViewer } from "../src";
import CustomCollapse from "@/components/CustomCollapse.vue";
import {ref} from "vue";
const colorScheme = ref('light')



//setTimeout(() => {
//  colorScheme.value = 'dark'
//}, 3000)


const text = ref(`
执行命令：\`npm install marked\`

\`\`\`php
<?php echo "Hello world!"; ?>
\`\`\`


# *JS代码*

\`\`\`javascript
function test() {
    console.log("Hello world!");
}

(function(){
    var box = function() {
        return box.fn.init();
    };

    box.prototype = box.fn = {
        init: function(){
            console.log('box.init()');
            return this;
        },

        add: function(str) {
            alert("add", str);
            return this;
        },

        remove: function(str) {
            alert("remove", str);
            return this;
        }
    };

    box.fn.init.prototype = box.fn;

    window.box =box;
})();

var testBox = box();
testBox.add("jQuery").remove("jQuery");
`)

</script>
