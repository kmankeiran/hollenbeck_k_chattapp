// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['msg'],

    template: `
        <div>
            <li class="new-message" :class="{ 'my-message' : matchedID}">
                <span>{{ msg.message.name }} says:</span>
                {{ msg.message.content }}
            </li>
            <button v-on:click="likeEvent" id="likeButton">Like Message</button>
        </div>
    `,

    data: function() {
        return { 
            message: "hello from the template",
            matchedID: this.$parent.socketID == this.msg.id
    };

}

}