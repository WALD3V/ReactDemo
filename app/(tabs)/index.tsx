import ExampleCharts from '@/components/ExampleCharts';
import { ThemedText } from '@/components/themed-text';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="title" style={{ color: 'white' }}>Mercados</ThemedText>
          {/* Simple profile icon placeholder */}
          <View style={styles.profileIcon} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ExampleCharts />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555'
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
