const resp = (s, m) => ({ status: s, message: m });
const respE = (s, m) => resp(s, { message: m });

module.exports = { resp, respE };
