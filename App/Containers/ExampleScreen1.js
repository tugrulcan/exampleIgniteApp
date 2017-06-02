import React from 'react'
import { View, Text, ListView, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import studentListData from '../Fixtures/data.json'

import { phonecall } from 'react-native-communications';
import ActionButton from 'react-native-action-button';
import GiftedListView from 'react-native-gifted-listview';

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ExampleScreen1Style'

const TICK_ICON = require('../Images/tick.png');
const CROSS_ICON = require('../Images/cross.png');
const CALL_ICON = require('../Images/call.png');
const ROUTE_ICON = require('../Images/route.png');

const IBO_PNG = require('../Images/ibo.png');
class ExampleScreen1 extends React.Component {
  // state: {
  //   dataSource:
  // }

  constructor(props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = studentListData.studentList
    // [
    //   {title: 'First Title', description: 'First Description'},
    //   {title: 'Second Title', description: 'Second Description'},
    //   {title: 'Third Title', description: 'Third Description'},
    //   {title: 'Fourth Title', description: 'Fourth Description'},
    //   {title: 'Fifth Title', description: 'Fifth Description'},
    //   {title: 'Sixth Title', description: 'Sixth Description'},
    //   {title: 'Seventh Title', description: 'Seventh Description'}
    // ]

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({ rowHasChanged })

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
  }

  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/



  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <View style={{ flex: 3 }}   >
          <Image
            style={{ width: 90, height: 90, borderRadius: 50 }}
            source={IBO_PNG}
          //source={{ uri: rowData.photoURL }}
          />
        </View>
        <View style={{ justifyContent: 'flex-start', flex: 3 }}>
          <Text style={styles.boldLabel}>{rowData.name}</Text>
          <Text style={styles.label}>{rowData.parentName}</Text>
          <Text style={styles.label}>{rowData.parentPhone}</Text>
        </View>
        <View style={{ justifyContent: 'center', flex: 3 }} >
          <Image
            style={{ width: 40, height: 40 }}
            source={rowData.willUse ? TICK_ICON : CROSS_ICON}
          />
        </View>
        <View style={{ flex: 3 }} >
          <TouchableHighlight onPress={() => phonecall(rowData.parentPhone, true)}>
            <Image
              style={{ width: 40, height: 40 }}
              source={CALL_ICON}
            />
          </TouchableHighlight>
        </View>

      </View>

    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData() {
    return this.state.dataSource.getRowCount() === 0
  }

  // Render a footer.
  renderFooter = () => {
    return (
      <Text> - Footer - </Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedListView
          rowView={this.renderRow}
          dataSource={this.state.dataSource}
          firstLoader={true} // display a loader for the first fetching
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableTintColor="blue"
        />

        {/* Rest of the app comes ABOVE the action button component !*/}

        <ActionButton
          buttonColor="rgba(30, 144, 255,1)"
          position = "center"
          size = {100}
          icon={<Image source={ROUTE_ICON} style={{ height: 80, width: 80, borderRadius:50}} />}
          onPress={() => { alert("hi") }}
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleScreen1)
