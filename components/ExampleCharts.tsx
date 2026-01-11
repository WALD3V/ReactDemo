import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

const CryptoDashboard = () => {
    // --- STATE MANAGEMENT ---
    const [btcTimeframe, setBtcTimeframe] = useState('1H');
    const [volumeChartType, setVolumeChartType] = useState<'Bar' | 'Line'>('Bar');
    const [portfolioView, setPortfolioView] = useState<'Distribution' | 'Performance'>('Distribution');


    // --- DATA MOCKS ---
    const lineData1H = [
        { value: 50, label: '10:00' }, { value: 80, label: '' }, { value: 90, label: '10:10' },
        { value: 70, label: '' }, { value: 85, label: '10:20' }, { value: 100, label: '' },
        { value: 110, label: '10:30' }, { value: 105, label: '' }, { value: 130, label: '10:40' }
    ];
    const lineData24H = [
        { value: 40, label: '00:00' }, { value: 60, label: '' }, { value: 55, label: '08:00' },
        { value: 90, label: '' }, { value: 85, label: '16:00' }, { value: 110, label: '' }
    ];
    // Dynamic selection
    const currentLineData = btcTimeframe === '1H' ? lineData1H : lineData24H;


    const volumeBarData = [
        { value: 250, label: 'Lun', frontColor: '#4ABFF4' },
        { value: 500, label: 'Mar', frontColor: '#79C2BD' },
        { value: 745, label: 'Mié', frontColor: '#28B2B3' },
        { value: 320, label: 'Jue', frontColor: '#4ABFF4' },
        { value: 600, label: 'Vie', frontColor: '#79C2BD' },
    ];
    const volumeLineData = [
        { value: 250, label: 'Lun' }, { value: 500, label: 'Mar' }, { value: 745, label: 'Mié' },
        { value: 320, label: 'Jue' }, { value: 600, label: 'Vie' },
    ];


    const pieData = [
        { value: 54, color: '#009FFF', text: '54%' },
        { value: 30, color: '#93FCF8', text: '30%' },
        { value: 16, color: '#BDB2FA', text: '16%' },
    ];

    const performanceData = [
        { value: 10, label: 'Ene' }, { value: 20, label: 'Feb' }, { value: 15, label: 'Mar' },
        { value: 30, label: 'Abr' }, { value: 40, label: 'May' }, { value: 35, label: 'Jun' }
    ];

    // --- SALES DATA ---
    const salesDataWeek = [
        { value: 1500, label: 'Lun', frontColor: '#FF6B6B' },
        { value: 2800, label: 'Mar', frontColor: '#FF6B6B' },
        { value: 2000, label: 'Mié', frontColor: '#FF6B6B' },
        { value: 2500, label: 'Jue', frontColor: '#FF6B6B' },
        { value: 3200, label: 'Vie', frontColor: '#FF6B6B' },
        { value: 4000, label: 'Sáb', frontColor: '#4ECDC4' },
        { value: 3500, label: 'Dom', frontColor: '#4ECDC4' },
    ];

    const salesDataYear = [
        { value: 12000, label: 'Ene' }, { value: 15000, label: 'Feb' }, { value: 10000, label: 'Mar' },
        { value: 22000, label: 'Abr' }, { value: 28000, label: 'May' }, { value: 32000, label: 'Jun' },
        { value: 35000, label: 'Jul' }, { value: 30000, label: 'Ago' }, { value: 42000, label: 'Sep' },
    ];

    // State for Sales Chart
    const [salesView, setSalesView] = useState<'Semana' | 'Año'>('Semana');
    const currentSalesData = salesView === 'Semana' ? salesDataWeek : salesDataYear;


    // --- RENDER HELPERS ---
    const renderTab = (label: string, selected: boolean, onPress: () => void) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.tabButton, selected && styles.tabButtonActive]}
        >
            <Text style={[styles.tabText, selected && styles.tabTextActive]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {/* SECTION 1: BITCOIN DYNAMIC CHART */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.chartTitle}>Bitcoin (BTC)</Text>
                        <Text style={styles.chartSubtitle}>$42,503.20 <Text style={{ color: '#00ff00' }}>+2.5%</Text></Text>
                    </View>
                    <View style={styles.tabsContainer}>
                        {renderTab('1H', btcTimeframe === '1H', () => setBtcTimeframe('1H'))}
                        {renderTab('24H', btcTimeframe === '24H', () => setBtcTimeframe('24H'))}
                    </View>
                </View>

                <LineChart
                    areaChart
                    curved
                    data={currentLineData}
                    height={180}
                    width={screenWidth - 70} // adjusted for padding
                    hideDataPoints
                    spacing={40}
                    color1="#00D2FF"
                    startFillColor="rgba(20,105,81,0.3)"
                    endFillColor="rgba(20,105,81,0.01)"
                    startOpacity={0.9}
                    endOpacity={0.2}
                    initialSpacing={10}
                    noOfSections={4}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    rulesType="solid"
                    rulesColor="rgba(255,255,255,0.1)"
                    yAxisTextStyle={{ color: 'gray' }}
                    xAxisLabelTextStyle={{ color: 'gray' }}
                    pointerConfig={{
                        pointerStripHeight: 160,
                        pointerStripColor: 'lightgray',
                        pointerStripWidth: 2,
                        pointerColor: 'lightgray',
                        radius: 6,
                        pointerLabelWidth: 100,
                        pointerLabelHeight: 90,
                        activatePointersOnLongPress: true,
                        autoAdjustPointerLabelPosition: false,
                        pointerLabelComponent: (items: any) => {
                            return (
                                <View style={styles.pointerLabel}>
                                    <Text style={styles.pointerLabelText}>{items[0].date}</Text>
                                    <View style={styles.pointerValueContainer}>
                                        <Text style={styles.pointerValueText}>
                                            {'$' + items[0].value}
                                        </Text>
                                    </View>
                                </View>
                            );
                        },
                    }}
                />
            </View>


            {/* SECTION 2: VOLUME (SWITCHABLE TYPE) */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.chartTitle}>Análisis de Volumen</Text>
                    <View style={styles.tabsContainer}>
                        {renderTab('Barras', volumeChartType === 'Bar', () => setVolumeChartType('Bar'))}
                        {renderTab('Línea', volumeChartType === 'Line', () => setVolumeChartType('Line'))}
                    </View>
                </View>

                {volumeChartType === 'Bar' ? (
                    <BarChart
                        barWidth={22}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data={volumeBarData}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        rulesColor="rgba(255,255,255,0.1)"
                        yAxisTextStyle={{ color: 'gray' }}
                        xAxisLabelTextStyle={{ color: 'gray' }}
                        isAnimated
                    />
                ) : (
                    <LineChart
                        data={volumeLineData}
                        height={180}
                        width={screenWidth - 80}
                        thickness={3}
                        color="#79C2BD"
                        dataPointsColor="#79C2BD"
                        yAxisThickness={0}
                        xAxisThickness={0}
                        rulesColor="rgba(255,255,255,0.1)"
                        yAxisTextStyle={{ color: 'gray' }}
                        xAxisLabelTextStyle={{ color: 'gray' }}
                    />
                )}
            </View>


            {/* SECTION 3: PORTFOLIO WIDGETS */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.chartTitle}>Mi Portafolio</Text>
                    <View style={styles.tabsContainer}>
                        {renderTab('Distr.', portfolioView === 'Distribution', () => setPortfolioView('Distribution'))}
                        {renderTab('Rend.', portfolioView === 'Performance', () => setPortfolioView('Performance'))}
                    </View>
                </View>

                <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                    {portfolioView === 'Distribution' ? (
                        <PieChart
                            data={pieData}
                            donut
                            showText
                            textColor="black"
                            radius={100}
                            innerRadius={60}
                            textSize={12}
                            textBackgroundRadius={20}
                            centerLabelComponent={() => {
                                return <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>$12k</Text>;
                            }}
                        />
                    ) : (
                        <View>
                            <Text style={{ color: 'gray', marginBottom: 10, textAlign: 'center' }}>Crecimiento Mensual</Text>
                            <BarChart
                                barWidth={30}
                                noOfSections={3}
                                barBorderRadius={4}
                                frontColor="#BDB2FA"
                                data={performanceData}
                                yAxisThickness={0}
                                xAxisThickness={0}
                                rulesColor="rgba(255,255,255,0.1)"
                                yAxisTextStyle={{ color: 'gray' }}
                                xAxisLabelTextStyle={{ color: 'gray' }}
                                isAnimated
                            />
                        </View>
                    )}
                </View>
            </View>

            {/* SECTION 4: SALES CHART (DYNAMIC SELECTORS) */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.chartTitle}>Reporte de Ventas</Text>
                        <Text style={styles.chartSubtitle}>
                            {salesView === 'Semana' ? 'Últimos 7 días' : 'Desempeño Anual 2024'}
                        </Text>
                    </View>
                    <View style={styles.tabsContainer}>
                        {renderTab('Semana', salesView === 'Semana', () => setSalesView('Semana'))}
                        {renderTab('Año', salesView === 'Año', () => setSalesView('Año'))}
                    </View>
                </View>

                <BarChart
                    data={currentSalesData}
                    barWidth={salesView === 'Semana' ? 30 : 20}
                    width={screenWidth - 60}
                    noOfSections={4}
                    barBorderRadius={4}
                    frontColor="#FF6B6B"
                    yAxisThickness={0}
                    xAxisThickness={0}
                    rulesColor="rgba(255,255,255,0.1)"
                    yAxisTextStyle={{ color: 'gray' }}
                    xAxisLabelTextStyle={{ color: 'gray' }}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
        backgroundColor: '#000',
        flex: 1,
    },
    card: {
        backgroundColor: '#1a1a1a',
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    chartTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    chartSubtitle: {
        color: 'gray',
        fontSize: 14,
    },
    // Tabs Styles
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 2,
    },
    tabButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    tabButtonActive: {
        backgroundColor: '#555',
    },
    tabText: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '600',
    },
    tabTextActive: {
        color: 'white',
    },
    // Pointer Styles
    pointerLabel: {
        height: 90,
        width: 100,
        justifyContent: 'center',
        marginTop: -30,
        marginLeft: -40,
    },
    pointerLabelText: {
        color: 'white',
        fontSize: 14,
        marginBottom: 6,
        textAlign: 'center'
    },
    pointerValueContainer: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: 'white'
    },
    pointerValueText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    }
});

export default CryptoDashboard;
