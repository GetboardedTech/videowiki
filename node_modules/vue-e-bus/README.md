
# Event bus for Vue

Use this plugin for emit events for anywhere components, e.g:

```javascript
import EventBus from '@m/bus'
// in a component
mounted () {
  EventBus.$emit('message', 'Hello')
}

// in another component
mounted () {
  EventBus.$on('message', (message) => alert(`Say: ${message}`))
}

// output: Say: Hello
``` 
