const express = require('express');
const router = express.Router();

// Mock sales data generator
function generateMockSalesData() {
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'];
  const products = ['Enterprise Software', 'Cloud Services', 'Mobile Solutions', 'Analytics Platform', 'Security Suite'];
  const salesReps = [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson',
    'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez', 'William Garcia', 'Amanda Thompson'
  ];

  const salesData = [];
  const now = new Date();
  
  // Generate data for the last 12 months
  for (let month = 0; month < 12; month++) {
    const date = new Date(now.getFullYear(), now.getMonth() - month, 1);
    
    regions.forEach((region, regionIndex) => {
      products.forEach((product, productIndex) => {
        const numTransactions = Math.floor(Math.random() * 20) + 5; // 5-25 transactions per region/product/month
        
        for (let i = 0; i < numTransactions; i++) {
          const dayInMonth = Math.floor(Math.random() * 28) + 1;
          const transactionDate = new Date(date.getFullYear(), date.getMonth(), dayInMonth);
          
          salesData.push({
            id: `${date.getFullYear()}${date.getMonth()}${regionIndex}${productIndex}${i}`,
            date: transactionDate.toISOString().split('T')[0],
            region: region,
            product: product,
            salesRep: salesReps[Math.floor(Math.random() * salesReps.length)],
            amount: Math.floor(Math.random() * 100000) + 10000, // $10k - $110k
            stage: ['Prospecting', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'][Math.floor(Math.random() * 6)],
            quarter: Math.ceil((transactionDate.getMonth() + 1) / 3),
            month: transactionDate.getMonth() + 1,
            year: transactionDate.getFullYear()
          });
        }
      });
    });
  }
  
  return salesData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Cache the mock data
let mockSalesData = generateMockSalesData();

/**
 * GET /api/sales/overview
 * Get sales overview metrics
 */
router.get('/api/sales/overview', (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentQuarter = Math.ceil(currentMonth / 3);
    
    const closedWonData = mockSalesData.filter(sale => sale.stage === 'Closed Won');
    
    // Current month sales
    const currentMonthSales = closedWonData.filter(sale => 
      sale.year === currentYear && sale.month === currentMonth
    );
    
    // Current quarter sales
    const currentQuarterSales = closedWonData.filter(sale => 
      sale.year === currentYear && sale.quarter === currentQuarter
    );
    
    // Year to date sales
    const ytdSales = closedWonData.filter(sale => sale.year === currentYear);
    
    const overview = {
      totalSales: {
        currentMonth: {
          amount: currentMonthSales.reduce((sum, sale) => sum + sale.amount, 0),
          count: currentMonthSales.length
        },
        currentQuarter: {
          amount: currentQuarterSales.reduce((sum, sale) => sum + sale.amount, 0),
          count: currentQuarterSales.length
        },
        yearToDate: {
          amount: ytdSales.reduce((sum, sale) => sum + sale.amount, 0),
          count: ytdSales.length
        }
      },
      topMetrics: {
        totalOpportunities: mockSalesData.length,
        averageDealSize: Math.round(closedWonData.reduce((sum, sale) => sum + sale.amount, 0) / closedWonData.length),
        winRate: Math.round((closedWonData.length / mockSalesData.length) * 100)
      }
    };
    
    res.json({
      status: 'success',
      data: overview,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching sales overview',
      error: error.message
    });
  }
});

/**
 * GET /api/sales/regions
 * Get sales data by region
 */
router.get('/api/sales/regions', (req, res) => {
  try {
    const regionSales = {};
    const closedWonData = mockSalesData.filter(sale => sale.stage === 'Closed Won');
    
    closedWonData.forEach(sale => {
      if (!regionSales[sale.region]) {
        regionSales[sale.region] = {
          region: sale.region,
          totalAmount: 0,
          count: 0
        };
      }
      regionSales[sale.region].totalAmount += sale.amount;
      regionSales[sale.region].count += 1;
    });
    
    const regions = Object.values(regionSales).sort((a, b) => b.totalAmount - a.totalAmount);
    
    res.json({
      status: 'success',
      data: regions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching regional sales data',
      error: error.message
    });
  }
});

/**
 * GET /api/sales/products
 * Get top performing products
 */
router.get('/api/sales/products', (req, res) => {
  try {
    const productSales = {};
    const closedWonData = mockSalesData.filter(sale => sale.stage === 'Closed Won');
    
    closedWonData.forEach(sale => {
      if (!productSales[sale.product]) {
        productSales[sale.product] = {
          product: sale.product,
          totalAmount: 0,
          count: 0
        };
      }
      productSales[sale.product].totalAmount += sale.amount;
      productSales[sale.product].count += 1;
    });
    
    const products = Object.values(productSales).sort((a, b) => b.totalAmount - a.totalAmount);
    
    res.json({
      status: 'success',
      data: products,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching product sales data',
      error: error.message
    });
  }
});

/**
 * GET /api/sales/reps
 * Get sales rep leaderboard
 */
router.get('/api/sales/reps', (req, res) => {
  try {
    const repSales = {};
    const closedWonData = mockSalesData.filter(sale => sale.stage === 'Closed Won');
    
    closedWonData.forEach(sale => {
      if (!repSales[sale.salesRep]) {
        repSales[sale.salesRep] = {
          salesRep: sale.salesRep,
          totalAmount: 0,
          count: 0
        };
      }
      repSales[sale.salesRep].totalAmount += sale.amount;
      repSales[sale.salesRep].count += 1;
    });
    
    const reps = Object.values(repSales).sort((a, b) => b.totalAmount - a.totalAmount);
    
    res.json({
      status: 'success',
      data: reps,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching sales rep data',
      error: error.message
    });
  }
});

/**
 * GET /api/sales/funnel
 * Get sales funnel data
 */
router.get('/api/sales/funnel', (req, res) => {
  try {
    const funnelStages = {};
    
    mockSalesData.forEach(sale => {
      if (!funnelStages[sale.stage]) {
        funnelStages[sale.stage] = {
          stage: sale.stage,
          count: 0,
          totalAmount: 0
        };
      }
      funnelStages[sale.stage].count += 1;
      funnelStages[sale.stage].totalAmount += sale.amount;
    });
    
    // Order stages logically
    const stageOrder = ['Prospecting', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
    const funnel = stageOrder.map(stage => funnelStages[stage]).filter(Boolean);
    
    res.json({
      status: 'success',
      data: funnel,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching sales funnel data',
      error: error.message
    });
  }
});

/**
 * GET /api/sales/trends
 * Get sales trends over time
 */
router.get('/api/sales/trends', (req, res) => {
  try {
    const { months = 12 } = req.query;
    const trends = {};
    const closedWonData = mockSalesData.filter(sale => sale.stage === 'Closed Won');
    
    closedWonData.forEach(sale => {
      const monthKey = `${sale.year}-${sale.month.toString().padStart(2, '0')}`;
      if (!trends[monthKey]) {
        trends[monthKey] = {
          period: monthKey,
          totalAmount: 0,
          count: 0
        };
      }
      trends[monthKey].totalAmount += sale.amount;
      trends[monthKey].count += 1;
    });
    
    const sortedTrends = Object.values(trends)
      .sort((a, b) => a.period.localeCompare(b.period))
      .slice(-parseInt(months));
    
    res.json({
      status: 'success',
      data: sortedTrends,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching sales trends',
      error: error.message
    });
  }
});

/**
 * GET /api/sales/data
 * Get filtered sales data
 */
router.get('/api/sales/data', (req, res) => {
  try {
    const { region, product, salesRep, startDate, endDate, stage } = req.query;
    let filteredData = [...mockSalesData];
    
    if (region) {
      filteredData = filteredData.filter(sale => sale.region === region);
    }
    
    if (product) {
      filteredData = filteredData.filter(sale => sale.product === product);
    }
    
    if (salesRep) {
      filteredData = filteredData.filter(sale => sale.salesRep === salesRep);
    }
    
    if (stage) {
      filteredData = filteredData.filter(sale => sale.stage === stage);
    }
    
    if (startDate) {
      filteredData = filteredData.filter(sale => sale.date >= startDate);
    }
    
    if (endDate) {
      filteredData = filteredData.filter(sale => sale.date <= endDate);
    }
    
    res.json({
      status: 'success',
      data: filteredData,
      totalRecords: filteredData.length,
      filters: { region, product, salesRep, startDate, endDate, stage },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching sales data',
      error: error.message
    });
  }
});

/**
 * GET /api/sales/filters
 * Get available filter options
 */
router.get('/api/sales/filters', (req, res) => {
  try {
    const regions = [...new Set(mockSalesData.map(sale => sale.region))].sort();
    const products = [...new Set(mockSalesData.map(sale => sale.product))].sort();
    const salesReps = [...new Set(mockSalesData.map(sale => sale.salesRep))].sort();
    const stages = [...new Set(mockSalesData.map(sale => sale.stage))];
    
    res.json({
      status: 'success',
      data: {
        regions,
        products,
        salesReps,
        stages
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching filter options',
      error: error.message
    });
  }
});

module.exports = router;