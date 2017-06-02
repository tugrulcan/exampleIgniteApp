import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.frost,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems:'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.drawer,
    textAlign: 'left',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'left',
    color: Colors.drawer
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
